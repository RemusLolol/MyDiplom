package com.example.Beltamozh.service;

import com.example.Beltamozh.model.Savesoperations;
import com.example.Beltamozh.repository.SavesOperationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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

    public BigDecimal calculateItogSS(Savesoperations savesOperations) {
        BigDecimal nds = savesOperations.getSs().multiply(BigDecimal.valueOf(20.00)).divide(BigDecimal.valueOf(100.00));
        BigDecimal tamPoshl = savesOperations.getSs().multiply(savesOperations.getTamposhl()).divide(BigDecimal.valueOf(100.00));
        BigDecimal totalSS = savesOperations.getSs().add(nds).add(tamPoshl).add(savesOperations.getTransprashdogra().add(savesOperations.getTransprashposlegra()));
        return totalSS;
    }
}