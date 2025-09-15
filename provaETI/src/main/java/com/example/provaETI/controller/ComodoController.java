package com.example.provaETI.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
    public ResponseEntity<Comodo> buscarPorId(@PathVariable Long id) {
        return comodoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }   

    @PostMapping
    public Comodo criar(@RequestBody Comodo comodo) {
        return comodoService.salvar(comodo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        comodoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

    
