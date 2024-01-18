package com.example.Beltamozh.repository;

import com.example.Beltamozh.model.Savesoperations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SavesOperationsRepository extends JpaRepository<Savesoperations, Integer> {
}