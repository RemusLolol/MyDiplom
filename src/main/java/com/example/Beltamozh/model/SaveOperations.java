package com.example.Beltamozh.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class SaveOperations {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String typeTam;
    private BigDecimal tamposhl;
    private BigDecimal transprash;
    private BigDecimal weightprod;
    private BigDecimal itogss;
    private BigDecimal itogssperweight;
}