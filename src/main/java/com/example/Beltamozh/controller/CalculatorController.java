package com.example.Beltamozh.controller;


import com.example.Beltamozh.model.Products;
import com.example.Beltamozh.model.Savesoperations;
import com.example.Beltamozh.service.ProductServices;
import com.example.Beltamozh.model.CalculatorFormData;
import com.example.Beltamozh.service.SavesOperationsService;
import org.springframework.http.HttpStatus;
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
    private final SavesOperationsService savesOperationsService;

    @Autowired
    public CalculatorController(ProductServices productService, SavesOperationsService savesOperationsService) {
        this.productService = productService;
        this.savesOperationsService = savesOperationsService;
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

    @PostMapping(value = "/submitForm", params = "!_")
    public ResponseEntity<BigDecimal> submitForm(@RequestBody Map<String, String> formData) {
        CalculatorFormData calculatorFormData = new CalculatorFormData(
                new BigDecimal(formData.get("textBoxSS")),
                new BigDecimal(formData.get("textBoxWeight")),
                new BigDecimal(formData.get("textBoxTamPoshl")),
                new BigDecimal(formData.get("transpRash")));
        BigDecimal totalWithNDS = calculatorFormData.calculateItogSS();
        return ResponseEntity.ok(totalWithNDS);
    }

    @PostMapping("/saveData")
    public ResponseEntity<Savesoperations> saveData(@RequestBody Map<String, String> formData) {
        Savesoperations savesOperations =
                new Savesoperations(formData.get("typetam"),
                new BigDecimal(formData.get("tamposhl")),
                new BigDecimal(formData.get("transprash")),
                new BigDecimal(formData.get("weightprod")),
                new BigDecimal(formData.get("itogss")),
                new BigDecimal(formData.get("itogssperweight")));
        Savesoperations savedData = savesOperationsService.saveOrUpdateSavesOperations(savesOperations);
        return ResponseEntity.ok(savedData);
    }

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