package com.example.Beltamozh.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.math.RoundingMode;

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
        BigDecimal itogtamPoshl = getTextBoxSS().multiply(getTextBoxTamPoshl());

        BigDecimal totalItogSS = getTextBoxSS().add(itogtamPoshl).add(getTextBoxTranspRash());

        BigDecimal NDS = new BigDecimal("20");
        BigDecimal NDSAmount = totalItogSS.multiply(NDS.divide(BigDecimal.valueOf(100), RoundingMode.HALF_UP));

        BigDecimal totalWithNDS = totalItogSS.add(NDSAmount);
        return totalWithNDS;
    }

    public String getInfo() {
        return "SS: " + getTextBoxSS() + " " +
                " Weight: " + getTextBoxWeight()+
                " TamPoshl: " + getTextBoxTamPoshl()+
                " TransRash: " + getTextBoxTranspRash();
    }
}