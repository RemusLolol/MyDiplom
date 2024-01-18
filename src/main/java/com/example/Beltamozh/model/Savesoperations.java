package com.example.Beltamozh.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Savesoperations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String typetam;
    private BigDecimal tamposhl;
    private BigDecimal transprash;
    private BigDecimal weightprod;
    private BigDecimal itogss;
    private BigDecimal itogssperweight;

    public Savesoperations(String typetam, BigDecimal tamposhl, BigDecimal transprash, BigDecimal weightprod, BigDecimal itogss, BigDecimal itogssperweight) {
        this.typetam = typetam;
        this.tamposhl = tamposhl;
        this.transprash = transprash;
        this.weightprod = weightprod;
        this.itogss = itogss;
        this.itogssperweight = itogssperweight;
    }
}