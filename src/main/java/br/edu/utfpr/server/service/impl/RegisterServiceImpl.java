package br.edu.utfpr.server.service.impl;

import br.edu.utfpr.server.model.Register;
import br.edu.utfpr.server.model.User;
import br.edu.utfpr.server.repository.RegisterRepository;
import br.edu.utfpr.server.service.RegisterService;
import br.edu.utfpr.server.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegisterServiceImpl implements RegisterService {

    private final RegisterRepository registerRepository;

    private final UserService userService;

    public RegisterServiceImpl(RegisterRepository registerRepository, UserService userService) {
        this.registerRepository = registerRepository;
        this.userService = userService;
    }

    @Override
    public Register save(Register register) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.findByUsername(principal.toString());
        register.setUser(user);
        return registerRepository.save(register);
    }

    @Override
    public Register findOne(Long id) {
        return registerRepository.findById(id).orElse(null);
    }

    @Override
    public List<Register> findAll() {
        return registerRepository.findAll();
    }

    @Override
    public List<Register> findByUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.findByUsername(principal.toString());
        Long userId = user.getId();
        return registerRepository.findAllByUserId(userId);
    }

    public Double getBankBalance(Long register){
        return findOne(register).getBank_balance();
    }

    @Override
    public void delete(Long id) {
        registerRepository.deleteById(id);
    }
}
