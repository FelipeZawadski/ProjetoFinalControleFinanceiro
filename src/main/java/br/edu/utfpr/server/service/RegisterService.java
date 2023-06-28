package br.edu.utfpr.server.service;

import br.edu.utfpr.server.model.Register;

import java.util.List;

public interface RegisterService {

    Register save(Register register);

    Register findOne(Long id);

    List<Register> findAll();

    List<Register> findByUserId();

    void delete(Long id);

    Double getBankBalance(Long id);
}
