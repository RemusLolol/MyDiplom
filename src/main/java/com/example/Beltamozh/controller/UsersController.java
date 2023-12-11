package com.example.Beltamozh.controller;

import com.example.Beltamozh.repository.UsersRepository;
import com.example.Beltamozh.service.UsersService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UsersController {
    @Autowired
    private UsersRepository usersRepository;
    @GetMapping
    public String main(Model model){
        return "heww";
    }

    @GetMapping("/users")
    public String getAllUsers(Model model) {
//        model.addAttribute("users", usersService.getAllUsers());
        model.addAttribute("users", usersRepository.findAll());
        return "users.html";
    }
}

