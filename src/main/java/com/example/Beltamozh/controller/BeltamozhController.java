package com.example.Beltamozh.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BeltamozhController{
    @GetMapping("/main")
    public String beltzmozh(){
        return "";
    }
}
