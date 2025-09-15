package com.example.provaETI.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;


@Entity
public class Comodo {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)

    private Long id;
    private String nome;
    private List <Comodo> comodos;

    //um comodo pertence a um imovel

    //varios comodos podem pertencer a um imovel
    @ManyToOne
    @JoinTable(name = "imovel_id")
    private Imovel imovel;

   
    public Long getId() {
        return id;
    }
    public void setId(Long id){
        this.id =id;
    }

     public String nome(){
        return nome;
    }

    public void setNome(String nome){
        this.nome = nome;
    }

    public Imovel getImovel() {
        return imovel;
    }

    public void setImovel(Imovel imovel) {
        this.imovel = imovel;
    }

    public List<Comodo> getComodos() {
        return comodos;
    }

    public void setComodos(List<Comodo> comodos) {
        this.comodos = comodos;
    }

  }