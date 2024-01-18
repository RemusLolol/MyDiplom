package com.example.Beltamozh.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CalculatorFormData {
    private BigDecimal textBoxSS;
    private BigDecimal textBoxWeight;
    private BigDecimal textBoxTamPoshl;
    private BigDecimal textBoxTranspRash;

    public BigDecimal calculateItogSS() {
        BigDecimal nds = getTextBoxSS().multiply(BigDecimal.valueOf(20.00)).divide(BigDecimal.valueOf(100.00));
        BigDecimal tamPoshl = getTextBoxSS().multiply(getTextBoxTamPoshl()).divide(BigDecimal.valueOf(100.00));
        BigDecimal totalSS = getTextBoxSS().add(nds).add(tamPoshl).add(getTextBoxTranspRash());
        return totalSS;
    }

    public String getInfo() {
        return "SS: " + getTextBoxSS() + " " +
                " Weight: " + getTextBoxWeight()+
                " TamPoshl: " + getTextBoxTamPoshl()+
                " TransRash: " + getTextBoxTranspRash();
    }
}