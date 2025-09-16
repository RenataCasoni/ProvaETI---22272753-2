package com.example.provaETI.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Imovel {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String endereco;
    private Date dataCompra;
    private String descricao;

    @OneToMany(mappedBy = "imovel", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Comodo> comodos;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;  
    }

    public String getEndereco(){
        return endereco;
    }

    public void setEndereco(String endereco){
        this.endereco = endereco;
    }

    public Date getDataCompra(){
        return dataCompra;
    }

    public void setDataCompra(Date dataCompra){
        this.dataCompra = dataCompra;
    }

    public String getDescricao(){
        return descricao;
    }

    public void setDescricao(String descricao){
        this.descricao = descricao;
    }


    public List<Comodo> getComodos() {
        return comodos;
    }

    public void setComodos(List<Comodo> comodos) {
        this.comodos = comodos;
    }

}