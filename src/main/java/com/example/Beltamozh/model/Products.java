package com.example.Beltamozh.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.math.BigDecimal;

@Entity
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tamname;
    private BigDecimal tamposhl;

    public Long getId() {
        return id;
    }

    public String getTamname() {
        return tamname;
    }

    public BigDecimal getTamposhl() {
        return tamposhl;
    }
}
