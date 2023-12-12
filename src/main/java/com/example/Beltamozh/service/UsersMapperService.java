package com.example.Beltamozh.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class UsersMapperService {

    private final ModelMapper modelMapper;

    public UsersMapperService(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
}
