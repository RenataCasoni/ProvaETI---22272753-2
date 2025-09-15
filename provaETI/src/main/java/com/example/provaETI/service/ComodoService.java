package com.example.provaETI.service;

import org.springframework.stereotype.Service;

import com.example.provaETI.model.Comodo;
import com.example.provaETI.repository.ComodoRepository; 

import java.util.List;
import java.util.Optional;


@Service
public class ComodoService {
    
    private final ComodoRepository comodoRepository;

    public ComodoService(ComodoRepository comodoRepository) {
        this.comodoRepository = comodoRepository;
    }

    public List<Comodo> listarTodos() {
        return comodoRepository.findAll();
    }

    public Optional<Comodo> buscarPorId(Long id) {
        return comodoRepository.findById(id);
    }   

    public Comodo salvar(Comodo comodo) {
        return comodoRepository.save(comodo);
    }   

    public void deletar(Long id) {
        comodoRepository.deleteById(id);
    }
}


