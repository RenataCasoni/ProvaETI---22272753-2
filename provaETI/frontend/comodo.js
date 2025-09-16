const apiUrlImoveis = 'http://127.0.0.1:8080/imovel';
const apiUrlComodos = 'http://127.0.0.1:8080/comodos';

let editMode = false;
let editingComodoId = null;

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM carregado, iniciando script para cômodos...");

    const form = document.getElementById("comodoForm");
    if (!form) {
        console.error("Elemento com ID 'comodoForm' não encontrado no DOM!");
        return;
    }
    console.log("Formulário encontrado:", form);

    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        console.log("Submit disparado, capturando dados do cômodo...");

        const nome = document.getElementById("nome").value.trim();
        const imovelId = document.getElementById("imovelId").value.trim();
        if (!nome || !imovelId) {
            alert("Por favor, preencha o nome e selecione um imóvel.");
            return;
        }

        const comodo = {
            nome: nome,
            imovel: { id: imovelId }
        };
        console.log("Dados do cômodo:", comodo);

        try {
            const url = editMode ? `${apiUrlComodos}/${editingComodoId}` : apiUrlComodos;
            const method = editMode ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(comodo)
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }

            editMode = false;
            editingComodoId = null;
            form.classList.remove("edit-mode");
            form.reset();
            carregarComodos();
        } catch (error) {
            console.error(`Erro ao ${editMode ? 'editar' : 'criar'} cômodo:`, error);
            alert(`Falha ao ${editMode ? 'editar' : 'adicionar'} o cômodo. Verifique o console.`);
        }
    });

    carregarComodos();
});

async function carregarImoveisParaSelect() {
    try {
        console.log("Carregando imóveis para o select...");
        const response = await fetch(apiUrlImoveis);
        console.log("Status da resposta (imoveis):", response.status);
        const rawResponse = await response.text();
        console.log("Resposta bruta da API (imoveis):", rawResponse.substring(0, 500) + "...");
        if (!response.ok) throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        let imoveis;
        try {
            imoveis = JSON.parse(rawResponse);
        } catch (jsonError) {
            console.error("Erro ao fazer parse do JSON dos imóveis:", jsonError);
            console.error("Resposta completa que causou o erro:", rawResponse);
            alert("Resposta inválida do servidor ao carregar imóveis. Verifique o console.");
            return;
        }
        const select = document.getElementById("imovelId");
        if (!select) {
            console.error("Elemento com ID 'imovelId' não encontrado!");
            return;
        }
        select.innerHTML = '<option value="" disabled selected>Selecione o Imóvel</option>';
        imoveis.forEach(imovel => {
            const option = document.createElement("option");
            option.value = imovel.id;
            option.textContent = `${imovel.descricao} (${imovel.endereco})`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar imóveis:", error);
    }
}

async function carregarComodos() {
    try {
        console.log("Carregando cômodos da API...");
        const response = await fetch(apiUrlComodos);
        console.log("Status da resposta (comodos):", response.status);
        if (!response.ok) throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        const comodos = await response.json();
        console.log("Cômodos recebidos:", comodos);

        const comodoList = document.getElementById("comodoList");
        if (!comodoList) {
            console.error("Elemento com ID 'comodoList' não encontrado no DOM!");
            return;
        }
        console.log("Lista de cômodos encontrada:", comodoList);

        comodoList.innerHTML = "";
        comodos.forEach(comodo => {
            const li = document.createElement("li");
            li.textContent = `${comodo.nome} - Imóvel ID: ${comodo.imovel?.id || "sem vínculo"}`;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Deletar";
            deleteButton.onclick = async () => {
                try {
                    console.log(`Tentando deletar cômodo com ID: ${comodo.id}`);
                    const deleteResponse = await fetch(`${apiUrlComodos}/${comodo.id}`, { method: 'DELETE' });
                    if (!deleteResponse.ok) {
                        throw new Error(`Erro ao deletar: ${deleteResponse.status} - ${deleteResponse.statusText}`);
                    }
                    carregarComodos();
                } catch (error) {
                    console.error("Erro ao deletar cômodo:", error);
                    alert("Falha ao deletar o cômodo. Verifique o console.");
                }
            };

            const editButton = document.createElement("button");
            editButton.textContent = "Editar";
            editButton.onclick = () => {
                editMode = true;
                editingComodoId = comodo.id;
                document.getElementById("nome").value = comodo.nome || "";
                document.getElementById("imovelId").value = comodo.imovel?.id || "";
                form.classList.add("edit-mode"); 
                form.scrollIntoView();
            };

            li.appendChild(deleteButton);
            li.appendChild(editButton);
            comodoList.appendChild(li);
        });
        carregarImoveisParaSelect();
    } catch (error) {
        console.error("Erro ao carregar comodos:", error);
        alert("Falha ao carregar a lista de cômodos. Verifique o console.");
    }
}