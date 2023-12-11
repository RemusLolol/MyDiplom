package com.example.Beltamozh.service;

import com.example.Beltamozh.entity.Users;
import com.example.Beltamozh.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;

    public Iterable<Users> getAllUsers() {
        return usersRepository.findAll();
    }

}
