package com.example.Beltamozh.model;

import java.math.BigDecimal;

public class CalculatorFormData {
    private String nameType;
    private BigDecimal nameTextBoxSS;
    private BigDecimal textBoxWeight;
    private BigDecimal textBoxTamPoshl;
    private BigDecimal textBoxTranspRash;

    public CalculatorFormData() {}

    public CalculatorFormData(String nameType, BigDecimal nameTextBoxSS, BigDecimal textBoxWeight, BigDecimal textBoxTamPoshl, BigDecimal textBoxTranspRash) {
        this.nameType = nameType;
        this.nameTextBoxSS = nameTextBoxSS;
        this.textBoxWeight = textBoxWeight;
        this.textBoxTamPoshl = textBoxTamPoshl;
        this.textBoxTranspRash = textBoxTranspRash;
    }

    public String getNameType() {
        return nameType;
    }

    public BigDecimal getNameTextBoxSS() {
        return nameTextBoxSS;
    }

    public BigDecimal getTextBoxWeight() {
        return textBoxWeight;
    }

    public BigDecimal getTextBoxTamPoshl() {
        return textBoxTamPoshl;
    }

    public BigDecimal getTextBoxTranspRash() {
        return textBoxTranspRash;
    }

    public void setNameType(String nameType) {
        this.nameType = nameType;
    }

    public void setNameTextBoxSS(BigDecimal nameTextBoxSS) {
        this.nameTextBoxSS = nameTextBoxSS;
    }

    public void setTextBoxWeight(BigDecimal textBoxWeight) {
        this.textBoxWeight = textBoxWeight;
    }

    public void setTextBoxTamPoshl(BigDecimal textBoxTamPoshl) {
        this.textBoxTamPoshl = textBoxTamPoshl;
    }

    public void setTextBoxTranspRash(BigDecimal textBoxTranspRash) {
        this.textBoxTranspRash = textBoxTranspRash;
    }

    
}