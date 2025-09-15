package com.example.provaETI.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.provaETI.model.Imovel;

public interface ImovelRepository extends JpaRepository<Imovel, Long> {
    
}
