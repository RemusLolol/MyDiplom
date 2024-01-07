package com.example.Beltamozh.controller;


import com.example.Beltamozh.model.Products;
import com.example.Beltamozh.service.ProductServices;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public String getAllProducts(Model model) {
        List<Products> products = productService.getAllProducts();
        model.addAttribute("productsList", products);
        return "calculator";
    }

    @GetMapping("/getTamposhl")
    @ResponseBody
    public BigDecimal getTamposhl(@RequestParam String tamname) {
        BigDecimal tamposhl = productService.getTamposhlByTamname(tamname);
        return tamposhl != null ? tamposhl : BigDecimal.ZERO;  // Можно задать значение по умолчанию
    }
}