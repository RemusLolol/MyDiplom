package com.example.Beltamozh.controller;


import com.example.Beltamozh.model.Products;
import com.example.Beltamozh.repository.ProductsRepository;

import com.example.Beltamozh.service.ProductServices;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;

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
        return "calculator";  // Возвращает имя HTML-файла без расширения
    }
}


//@RestController
//@RequestMapping("/calculator")
//public class CalculatorController {
//
//    private final ProductsRepository productsRepository;
//    private static final Logger logger = LoggerFactory.getLogger(CalculatorController.class);
//
//    @Autowired
//    public CalculatorController(ProductsRepository productsRepository) {
//        this.productsRepository = productsRepository;
//    }
//    @GetMapping("/calculator")
//    @ResponseBody
//    public List<Products> getApiProducts() {
//        return productsRepository.findAll();
//    }
//
//    @GetMapping
//    public ModelAndView getAllCustomsData(Model model) {
//        List<Products> customsDataList = productsRepository.findAll();
//
//        logger.info("Retrieved {} customs data entries", customsDataList.size());
//        logger.debug("Customs data: {}", customsDataList);
//
//        model.addAttribute("productsList", customsDataList);
//
//        return new ModelAndView("calculator");
//    }
//
//    @PostMapping
//    public Products addCustomsData(@RequestBody Products customsData) {
//        return productsRepository.save(customsData);
//    }
//}
