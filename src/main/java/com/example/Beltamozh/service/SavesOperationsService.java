package com.example.Beltamozh.service;

import com.example.Beltamozh.model.Savesoperations;
import com.example.Beltamozh.repository.SavesOperationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SavesOperationsService {

    private final SavesOperationsRepository savesOperationsRepository;

    @Autowired
    public SavesOperationsService(SavesOperationsRepository savesOperationsRepository) {
        this.savesOperationsRepository = savesOperationsRepository;
    }

    public List<Savesoperations> getAllSavesOperations() {
        return savesOperationsRepository.findAll();
    }

    public Savesoperations saveOrUpdateSavesOperations(Savesoperations savesOperations) {
        return savesOperationsRepository.save(savesOperations);
    }
}