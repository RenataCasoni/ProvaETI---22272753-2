package com.example.provaETI.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
public class Comodo {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String nome;

    //varios comodos podem pertencer a um imovel
    @ManyToOne
    @JoinColumn(name = "imovel_id")
    private Imovel imovel;

   
    public Long getId() {
        return id;
    }
    public void setId(Long id){
        this.id =id;
    }

     public String getNome(){
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

  }