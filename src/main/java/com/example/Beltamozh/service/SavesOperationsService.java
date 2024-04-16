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

    public Double calculateItogSS(Savesoperations savesOperations) {
        double ss = savesOperations.getSs();
        double nds = ss * 20.00 / 100.00;
        double tamPoshl = ss * savesOperations.getTamposhl() / 100.00;
        double totalSS = ss + nds + tamPoshl + savesOperations.getTransprashdogra() +
                savesOperations.getTransprashposlegra();
        return Math.round(totalSS * 100.0) / 100.0;
    }


    public void deleteAllSavesOperations() {
        savesOperationsRepository.deleteAll();
    }

    public List<Savesoperations> saveOrUpdateSavesOperations(List<Savesoperations> savesOperationsList) {
        return savesOperationsRepository.saveAll(savesOperationsList);
    }
}