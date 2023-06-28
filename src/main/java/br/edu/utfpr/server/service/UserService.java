package br.edu.utfpr.server.service;

import br.edu.utfpr.server.model.User;

public interface UserService {

    User save(User user);

    User findOne(Long id);

    void delete(Long id);

    User findByUsername(String username);

}
