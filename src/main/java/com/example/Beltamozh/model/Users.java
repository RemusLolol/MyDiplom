package com.example.Beltamozh.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String user_password;

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getUser_password() {
        return user_password;
    }

}
