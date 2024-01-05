package com.example.Beltamozh.controller;


import com.example.Beltamozh.model.Users;
import com.example.Beltamozh.repository.UsersRepository;

import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    private final UsersRepository usersRepository;
    private static final Logger logger = LoggerFactory.getLogger(UsersController.class);

    @Autowired
    public UsersController(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }
    @GetMapping("/api/users")
    @ResponseBody
    public List<Users> getApiUsers() {
        return usersRepository.findAll();
    }

    @GetMapping
    public ModelAndView getAllCustomsData(Model model) {
        List<Users> customsDataList = usersRepository.findAll();

        logger.info("Retrieved {} customs data entries", customsDataList.size());
        logger.debug("Customs data: {}", customsDataList);

        model.addAttribute("usersList", customsDataList);

        return new ModelAndView("users/dist/index");
    }

    @PostMapping
    public Users addCustomsData(@RequestBody Users customsData) {
        return usersRepository.save(customsData);
    }
}
