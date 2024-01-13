package com.example.Beltamozh.controller;


import com.example.Beltamozh.model.Products;
import com.example.Beltamozh.service.ProductServices;
import com.example.Beltamozh.model.CalculatorFormData;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.ui.Model;

import java.math.RoundingMode;
import java.util.List;
import java.math.BigDecimal;
import java.util.Map;

@Controller
@RequestMapping("/calculator")
public class CalculatorController {

    private final ProductServices productService;

    @Autowired
    public CalculatorController(ProductServices productService) {
        this.productService = productService;
    }

    @GetMapping
    public String getAllProducts(Map<String, Object> map) {
        List<Products> products = productService.getAllProducts();
        map.put("productsList", products);
        return "calculator";
    }

    @GetMapping("/getTamposhl")
    @ResponseBody
    public BigDecimal getTamposhl(@RequestParam String tamname) {
        BigDecimal tamposhl = productService.getTamposhlByTamname(tamname);
        return tamposhl != null ? tamposhl : BigDecimal.ZERO;
    }

    @PostMapping("/submitForm")
    public String submitForm(@RequestBody Map<String, String> formData, Model model) {
        BigDecimal textBoxSS = new BigDecimal(formData.get("textBoxSS"));
        BigDecimal textBoxWeight = new BigDecimal(formData.get("textBoxWeight"));
        BigDecimal textBoxTamPoshl = new BigDecimal(formData.get("textBoxTamPoshl"));
        BigDecimal textBoxTranspRash = new BigDecimal(formData.get("textBoxTranspRash"));

        CalculatorFormData calculatorFormData = new CalculatorFormData(textBoxSS, textBoxWeight, textBoxTamPoshl, textBoxTranspRash);

        System.out.println("textBoxSS: " + calculatorFormData.getTextBoxSS());
        System.out.println("textBoxWeight: " + calculatorFormData.getTextBoxWeight());
        System.out.println("textBoxTamPoshl: " + calculatorFormData.getTextBoxTamPoshl());
        System.out.println("textBoxTranspRash: " + calculatorFormData.getTextBoxTranspRash());

        BigDecimal totalWithNDS = calculatorFormData.calculateItogSS();
        model.addAttribute("totalWithNDS", totalWithNDS);
        return "redirect:/calculator";
    }



}