package com.example.Beltamozh.controller;

import com.example.Beltamozh.model.Products;
import com.example.Beltamozh.model.Savesoperations;
import com.example.Beltamozh.service.ProductServices;
import com.example.Beltamozh.service.SavesOperationsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
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
        Savesoperations savesoperations = new Savesoperations();

        savesoperations.setSs(new BigDecimal(formData.get("ss")));
        savesoperations.setWeightprod(new BigDecimal(formData.get("weight")));
        savesoperations.setTamposhl(new BigDecimal(formData.get("tamposhl")));
        savesoperations.setTransprashdogra(new BigDecimal(formData.get("transprashdogra")));
        savesoperations.setTransprashposlegra(new BigDecimal(formData.get("transprashposlegravalue")));

        return ResponseEntity.ok(savesOperationsService.calculateItogSS(savesoperations));
    }

    @PostMapping("/saveData")
    public ResponseEntity<Savesoperations> saveData(@RequestBody Map<String, String> formData) {
        Savesoperations savesOperations = new Savesoperations();

        savesOperations.setTypetam(formData.get("typetam"));
        savesOperations.setTamposhl(new BigDecimal(formData.get("tamposhl")));
        savesOperations.setSs(new BigDecimal(formData.get("ss")));
        savesOperations.setTransprashdogra(new BigDecimal(formData.get("transprashdogra")));
        savesOperations.setTransprashposlegra(new BigDecimal(formData.get("transprashposlegra")));
        savesOperations.setWeightprod(new BigDecimal(formData.get("weightprod")));
        savesOperations.setItogss(new BigDecimal(formData.get("itogss")));
        savesOperations.setItogssperweight(new BigDecimal(formData.get("itogssperweight")));

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

    @DeleteMapping("/deleteAllData")
    public ResponseEntity<String> deleteAllData() {
        try {
            savesOperationsService.deleteAllSavesOperations();
            return ResponseEntity.ok().body("Данные успешно удалены.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting saves operations: " + e.getMessage());
        }
    }

    @PostMapping("/saveMultipleData")
    public ResponseEntity<List<Savesoperations>> saveMultipleData(@RequestBody List<Savesoperations> savesOperationsList) {
        try {
            List<Savesoperations> savedData = savesOperationsService.saveOrUpdateSavesOperations(savesOperationsList);
            return ResponseEntity.ok(savedData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}