package com.example.Beltamozh.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Savesoperations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String typetam;
    private Double tamposhl;
    private Double ss;
    private Double transprashdogra;
    private Double transprashposlegra;
    private Double weightprod;
    private Double itogss;
    private Double itogssperweight;
}