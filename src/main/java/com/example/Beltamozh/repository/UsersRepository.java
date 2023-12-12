package com.example.Beltamozh.repository;

import com.example.Beltamozh.model.CustomsData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<CustomsData, Long> {
}