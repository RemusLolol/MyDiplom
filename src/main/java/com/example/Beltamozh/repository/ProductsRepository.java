package com.example.Beltamozh.repository;

import com.example.Beltamozh.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductsRepository extends JpaRepository<Products, Long> {
    Optional<Products> findByTamname(String tamname);
}