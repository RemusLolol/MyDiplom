package com.example.Beltamozh.service;

import com.example.Beltamozh.model.Products;
import com.example.Beltamozh.repository.ProductsRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServices {

    private final ProductsRepository productsRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ProductServices(ProductsRepository productsRepository, ModelMapper modelMapper) {
        this.productsRepository = productsRepository;
        this.modelMapper = modelMapper;
    }

    public List<Products> getAllProducts() {
        List<Products> productsList = productsRepository.findAll();

        List<Products> productDTOList = productsList.stream()
                .map(product -> modelMapper.map(product, Products.class))
                .collect(Collectors.toList());

        return productDTOList;
    }

    public BigDecimal getTamposhlByTamname(String tamname) {
        Optional<Products> productOptional = productsRepository.findByTamname(tamname);

        if (productOptional.isPresent()) {
            return productOptional.get().getTamposhl();
        } else {
            return null;
        }
    }
}
