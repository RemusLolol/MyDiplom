package com.example.Beltamozh.controller;

import com.example.Beltamozh.model.Products;
import com.example.Beltamozh.model.Savesoperations;
import com.example.Beltamozh.service.ProductServices;
import com.example.Beltamozh.service.SavesOperationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/reports")
public class ReportsController {
    private final ProductServices productService;
    private final SavesOperationsService savesOperationsService;

    @Autowired
    public ReportsController(ProductServices productService, SavesOperationsService savesOperationsService) {
        this.productService = productService;
        this.savesOperationsService = savesOperationsService;
    }
    @GetMapping
    public String showDocumentPage(Map<String, Object> map){
        List<Products> products = productService.getAllProducts();
        map.put("productsList", products);
        return "reports";}

    @GetMapping("/getAllSavesOperations")
    public ResponseEntity<List<Savesoperations>> getAllSavesOperations() {
        try {
            List<Savesoperations> savesOperationsList = savesOperationsService.getAllSavesOperations();
            return ResponseEntity.ok(savesOperationsList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}