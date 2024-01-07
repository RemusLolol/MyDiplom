package com.example.Beltamozh.repository;

import com.example.Beltamozh.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsRepository extends JpaRepository<Products, Long> {
}