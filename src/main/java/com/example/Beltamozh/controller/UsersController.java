package com.example.Beltamozh.controller;

import com.example.Beltamozh.model.CustomsData;
import com.example.Beltamozh.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/data")
public class UsersController {

    private final UsersRepository usersRepository;
    @Autowired
    public UsersController(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }
    @GetMapping
    public List<CustomsData> getAllCustomsData() {
        return usersRepository.findAll();
    }


    @PostMapping
    public CustomsData addCustomsData(@RequestBody CustomsData customsData) {
        return usersRepository.save(customsData);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomsData> getCustomsDataById(@PathVariable Long id) {
        Optional<CustomsData> customsData = usersRepository.findById(id);
        return customsData.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
