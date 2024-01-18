package com.example.Beltamozh.controller;


import com.example.Beltamozh.model.Products;
import com.example.Beltamozh.model.Savesoperations;
import com.example.Beltamozh.service.ProductServices;
import com.example.Beltamozh.model.CalculatorFormData;
import com.example.Beltamozh.service.SavesOperationsService;
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
        BigDecimal textBoxSS = new BigDecimal(formData.get("textBoxSS"));
        BigDecimal textBoxWeight = new BigDecimal(formData.get("textBoxWeight"));
        BigDecimal textBoxTamPoshl = new BigDecimal(formData.get("textBoxTamPoshl"));
        BigDecimal textBoxTranspRash = new BigDecimal(formData.get("textBoxTranspRash"));

        CalculatorFormData calculatorFormData = new CalculatorFormData(textBoxSS, textBoxWeight, textBoxTamPoshl, textBoxTranspRash);

        BigDecimal totalWithNDS = calculatorFormData.calculateItogSS();
        System.out.println("totalWithNDS: " + totalWithNDS);

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

        System.out.println("typetam: " + savesOperations.getTypetam());
        System.out.println("tamposhl: " + savesOperations.getTamposhl());
        System.out.println("transprash: " + savesOperations.getTransprash());
        System.out.println("weightprod: " + savesOperations.getWeightprod());
        System.out.println("itogss: " + savesOperations.getItogss());
        System.out.println("itogssperweight: " + savesOperations.getItogssperweight());


        Savesoperations savedData = savesOperationsService.saveOrUpdateSavesOperations(savesOperations);
        return ResponseEntity.ok(savedData);
    }
}