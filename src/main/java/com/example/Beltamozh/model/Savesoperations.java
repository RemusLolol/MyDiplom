package com.example.Beltamozh.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Data
public class Savesoperations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String typetam;
    private BigDecimal tamposhl;
    private BigDecimal ss;
    private BigDecimal transprashdogra;
    private BigDecimal transprashposlegra;
    private BigDecimal weightprod;
    private BigDecimal itogss;
    private BigDecimal itogssperweight;
}