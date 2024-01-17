package com.example.Beltamozh.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Beltamozh.model.SaveOperations;

public interface SaveOperationsRepository extends JpaRepository<SaveOperations, Integer> {
    // Дополнительные методы могут быть добавлены по необходимости
}
