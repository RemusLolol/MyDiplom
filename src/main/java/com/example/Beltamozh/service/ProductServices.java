package com.example.Beltamozh.service;

import com.example.Beltamozh.model.Products;
import com.example.Beltamozh.repository.ProductsRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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

        // Преобразование списка Products в список ProductDTO
        List<Products> productDTOList = productsList.stream()
                .map(product -> modelMapper.map(product, Products.class))
                .collect(Collectors.toList());

        return productDTOList;
    }
}
