package com.example.provaETI.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.provaETI.model.Comodo;
import com.example.provaETI.service.ComodoService;


@RestController
@RequestMapping("/comodos")
public class ComodoController {
    
    private final ComodoService comodoService;

    public ComodoController(ComodoService comodoService) {
        this.comodoService = comodoService;
    }

    @GetMapping
    public List<Comodo> listarTodos() {
        return comodoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Comodo buscarPorId(@PathVariable Long id) {
        return comodoService.buscarPorId(id)
                .orElseThrow(() -> new RuntimeException("Comodo não encontrado com id: " + id));
    }   

    @PostMapping
    public Comodo criar(@RequestBody Comodo comodo) {
        return comodoService.salvar(comodo);
    }

    @PutMapping("/{id}")
    public Comodo atualizar(@PathVariable Long id, @RequestBody Comodo comodoAtualizado) {
        return comodoService.atualizar(id, comodoAtualizado);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        comodoService.deletar(id);
    }
}

    
