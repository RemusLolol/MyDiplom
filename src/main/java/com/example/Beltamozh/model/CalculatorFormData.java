package com.example.Beltamozh.model;

import lombok.*;
import java.math.BigDecimal;

@Data
public class CalculatorFormData {
    private BigDecimal textBoxSS;
    private BigDecimal textBoxWeight;
    private BigDecimal textBoxTamPoshl;
    private BigDecimal textBoxTranspRash;

    public BigDecimal calculateItogSS() {
        BigDecimal nds = getTextBoxSS().multiply(BigDecimal.valueOf(20.00)).divide(BigDecimal.valueOf(100.00));
        BigDecimal tamPoshl = getTextBoxSS().multiply(getTextBoxTamPoshl()).divide(BigDecimal.valueOf(100.00));
        BigDecimal totalSS = getTextBoxSS().add(nds).add(tamPoshl).add(textBoxTranspRash);
        return totalSS;
    }
}