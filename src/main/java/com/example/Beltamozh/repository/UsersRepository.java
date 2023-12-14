package com.example.Beltamozh.repository;

import com.example.Beltamozh.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsersRepository extends JpaRepository<Users, Long> {
}