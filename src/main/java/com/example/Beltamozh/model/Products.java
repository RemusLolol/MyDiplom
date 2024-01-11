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

    public Products () {}

    public Products (Long id, String tamname, BigDecimal tamposhl){
        this.id = id;
        this.tamname = tamname;
        this.tamposhl = tamposhl;
    }
    public Products(String tamname, BigDecimal tamposhl){
        this.tamname = tamname;
        this.tamposhl = tamposhl;
    }

    public Long getId() {
        return id;
    }
    public String getTamname() {
        return tamname;
    }
    public BigDecimal getTamposhl() {
        return tamposhl;
    }

    public void setId (Long id) {this.id = id;}
    public void setTamname (String tamname) {this.tamname = tamname;}
    public void setTamposhl (BigDecimal tamposhl) {this.tamposhl = tamposhl;}
}