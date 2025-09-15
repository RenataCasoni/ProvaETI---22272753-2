package com.example.provaETI.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.provaETI.model.Imovel;
import com.example.provaETI.repository.ImovelRepository;

@Service
public class ImovelService {
   
    private final ImovelRepository imovelRepository;

    public ImovelService(ImovelRepository imovelRepository) {
        this.imovelRepository = imovelRepository;
    }

    public List<Imovel> listarTodos() {
        return imovelRepository.findAll();
    }

    public Optional<Imovel> buscarPorId(Long id) {
        return imovelRepository.findById(id);
    }   

    public Imovel salvar(Imovel imovel) {
        return imovelRepository.save(imovel);
    }   

    public void deletar(Long id) {
        imovelRepository.deleteById(id);
    }
}