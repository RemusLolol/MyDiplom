package com.example.Beltamozh.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.example.Beltamozh.model.SaveOperations;
import com.example.Beltamozh.repository.SaveOperationsRepository;
@Service
public class SaveOperationsService {

    private final SaveOperationsRepository savesOperationsRepository;

    @Autowired
    public SaveOperationsService(SaveOperationsRepository savesOperationsRepository) {
        this.savesOperationsRepository = savesOperationsRepository;
    }

    public List<SaveOperations> getAllSavesOperations() {
        return savesOperationsRepository.findAll();
    }

    public SaveOperations getSavesOperationById(Integer id) {
        return savesOperationsRepository.findById(id).orElse(null);
    }

    public SaveOperations saveSavesOperation(SaveOperations savesOperations) {
        return savesOperationsRepository.save(savesOperations);
    }

    public void deleteSavesOperation(Integer id) {
        savesOperationsRepository.deleteById(id);
    }
}
