package com.example.Beltamozh.controller;


import com.example.Beltamozh.model.Products;
import com.example.Beltamozh.service.ProductServices;
import com.example.Beltamozh.model.CalculatorFormData;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import java.util.List;
import java.math.BigDecimal;

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

    @PostMapping("/getDataFromHTML")
    public String submitForm(@ModelAttribute CalculatorFormData CalculatorFormData, Map<String, Object> map) {
        BigDecimal itogtamPoshl = CalculatorFormData.getNameTextBoxSS().multiply(CalculatorFormData.getTextBoxTamPoshl());

        BigDecimal totalItogSS=CalculatorFormData.getNameTextBoxSS().add(itogtamPoshl).add(CalculatorFormData.getTextBoxTranspRash());

        BigDecimal NDS = new BigDecimal("20");
        BigDecimal NDSAmount = totalItogSS.multiply(NDS.divide(BigDecimal.valueOf(100)));

        BigDecimal totalWithNDS = totalItogSS.add(NDSAmount);

        System.out.println(totalWithNDS);

        map.put("totalWithNDS", totalWithNDS);

        return "calculator :: #boxOutputData"; // обновляем только часть страницы
    }
}