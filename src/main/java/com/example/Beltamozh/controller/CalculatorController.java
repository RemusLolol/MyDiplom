package com.example.Beltamozh.controller;


import com.example.Beltamozh.model.Products;
import com.example.Beltamozh.service.ProductServices;
import com.example.Beltamozh.model.CalculatorFormData;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.math.BigDecimal;
import java.util.Map;

@Controller
@RequestMapping("/calculator")
public class CalculatorController {

    private final ProductServices productService;

    @Autowired
    public CalculatorController(ProductServices productService) {this.productService = productService;}

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
    public ResponseEntity<BigDecimal> submitForm(@RequestBody Map<String, String> formData) {
        BigDecimal textBoxSS = new BigDecimal(formData.get("textBoxSS"));
        BigDecimal textBoxWeight = new BigDecimal(formData.get("textBoxWeight"));
        BigDecimal textBoxTamPoshl = new BigDecimal(formData.get("textBoxTamPoshl"));
        BigDecimal textBoxTranspRash = new BigDecimal(formData.get("textBoxTranspRash"));

        CalculatorFormData calculatorFormData = new CalculatorFormData(textBoxSS, textBoxWeight, textBoxTamPoshl, textBoxTranspRash);

        BigDecimal totalWithNDS = calculatorFormData.calculateItogSS();
        System.out.println("totalWithNDS: " + totalWithNDS);

        return ResponseEntity.ok(totalWithNDS);
    }
}