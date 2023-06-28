package br.edu.utfpr.server.service;

import br.edu.utfpr.server.model.Movimentation;
import br.edu.utfpr.server.model.Register;

import java.util.List;

public interface MovimentationService {

    Movimentation save(Movimentation movement);

    Movimentation findOne(Long id);

    List<Movimentation> findAllByUser();

    List<Movimentation> findAll();

    void delete(Long id);

    void updateBalance(Movimentation movement, Movimentation movementOld);
}
