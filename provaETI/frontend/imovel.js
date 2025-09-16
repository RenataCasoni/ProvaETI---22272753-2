const apiUrl = 'http://127.0.0.1:8080/imovel';
const apiUrlComodos = 'http://127.0.0.1:8080/comodos';

document.addEventListener("DOMContentLoaded", carregarImoveis);

document.getElementById("imovelForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const imovel = {
        descricao: document.getElementById("descricao").value,
        endereco: document.getElementById("endereco").value,
        dataCompra: document.getElementById("datacompra").value
    };

    try {
        const url = editMode ? `${apiUrl}/${editingImovelId}` : apiUrl;
        const method = editMode ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(imovel)
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        editMode = false;
        editingImovelId = null;
        document.getElementById("imovelForm").reset();
        carregarImoveis();
    } catch (error) {
        console.error(`Erro ao ${editMode ? 'editar' : 'criar'} imóvel:`, error);
        alert(`Falha ao ${editMode ? 'editar' : 'adicionar'} o imóvel. Verifique o console para mais detalhes.`);
    }
});

async function carregarImoveis() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Resposta de erro do servidor ao carregar imóveis:", errorText);
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        let imoveis;
        try {
            imoveis = await response.json();
        } catch (jsonError) {
            console.error("Erro JSON dos imóveis:", jsonError);
            alert("Resposta inválida do servidor ao carregar imóveis.");
            return;
        }

        const imovelList = document.getElementById("imovelList");
        imovelList.innerHTML = "";

        for (const imovel of imoveis) {
            const li = document.createElement("li");
            li.textContent = `${imovel.descricao} - ${imovel.endereco} - ${formatDate(imovel.dataCompra)}`;

            let comodos = [];
            const comodosResponse = await fetch(`${apiUrlComodos}?imovelId=${imovel.id}`);
            if (comodosResponse.ok) {
                comodos = await comodosResponse.json();
            }

            if (comodos.length > 0) {
                const comodosList = document.createElement("ul");
                comodos.forEach(comodo => {
                    const comodoLi = document.createElement("li");
                    comodoLi.textContent = comodo.nome || "Sem nome";
                    comodosList.appendChild(comodoLi);
                });
                li.appendChild(comodosList);
            } else {
                const noComodos = document.createElement("span");
                noComodos.textContent = " (Sem cômodos)";
                li.appendChild(noComodos);
            }

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Deletar";
            deleteButton.onclick = async () => {
                try {
                    const deleteResponse = await fetch(`${apiUrl}/${imovel.id}`, { method: 'DELETE' });
                    if (!deleteResponse.ok) {
                        throw new Error(`Erro ao deletar: ${deleteResponse.statusText}`);
                    }
                    carregarImoveis();
                } catch (error) {
                    console.error("Erro ao deletar imóvel:", error);
                    alert("Falha ao deletar o imóvel. Verifique o console.");
                }
            };

            const editButton = document.createElement("button");
            editButton.textContent = "Editar";
            editButton.onclick = () => {
                editMode = true;
                editingImovelId = imovel.id;
                document.getElementById("descricao").value = imovel.descricao || "";
                document.getElementById("endereco").value = imovel.endereco || "";
                const dataCompra = formatDate(imovel.dataCompra);
                document.getElementById("datacompra").value = dataCompra;
                document.getElementById("imovelForm").scrollIntoView();
            };

            li.appendChild(deleteButton);
            li.appendChild(editButton);
            imovelList.appendChild(li);
        }
    } catch (error) {
        console.error("Erro ao carregar imoveis:", error);
        alert("Falha ao carregar a lista de imóveis. Verifique o console.");
    }
}


function formatDate(dateStr) {
    if (!dateStr) return "";
    let date = new Date(dateStr);
    if (isNaN(date.getTime())) return ""; 
    return date.toISOString().split('T')[0]; 
}

let editMode = false;
let editingImovelId = null;