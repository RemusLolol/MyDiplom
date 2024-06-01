package com.example.Beltamozh.service;

import com.example.Beltamozh.model.Products;
import com.example.Beltamozh.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductServices {
    private final ProductsRepository productsRepository;

    @Autowired
    public ProductServices(ProductsRepository productsRepository) {
            this.productsRepository = productsRepository;
        }

    public List<Products> getAllProducts() {
        return productsRepository.findAll();
    }

    public BigDecimal getTamposhlByTamname(String tamname) {
        return productsRepository.findByTamname(tamname)
                .map(Products::getTamposhl)
                .orElse(null);
    }
}