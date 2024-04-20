package com.example.Beltamozh.controller;

import com.example.Beltamozh.model.Products;
import com.example.Beltamozh.service.ProductServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/reports")
public class ReportsController {
    private final ProductServices productService;

    @Autowired
    public ReportsController(ProductServices productService) {
        this.productService = productService;
    }

    @GetMapping
    public String showDocumentPage(Map<String, Object> map){
        List<Products> products = productService.getAllProducts();
        map.put("productsList", products);
        return "reports";}
}