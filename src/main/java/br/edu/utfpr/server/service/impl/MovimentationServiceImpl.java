package br.edu.utfpr.server.service.impl;

import br.edu.utfpr.server.model.Movimentation;
import br.edu.utfpr.server.model.Register;
import br.edu.utfpr.server.model.User;
import br.edu.utfpr.server.repository.MovimentationRepository;
import br.edu.utfpr.server.service.MovimentationService;
import br.edu.utfpr.server.service.RegisterService;
import br.edu.utfpr.server.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovimentationServiceImpl implements MovimentationService {

    private final MovimentationRepository moveRepository;
    private final UserService userService;
    private final RegisterService registerService;

    public MovimentationServiceImpl(MovimentationRepository moveRepository, UserService userService, RegisterService registerService) {
        this.moveRepository = moveRepository;
        this.userService = userService;
        this.registerService = registerService;
    }

    @Override
    public Movimentation save(Movimentation movement) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.findByUsername(principal.toString());
        movement.setUser(user);
        Movimentation movimentationOld = new Movimentation();

        if(movement.getId() != null){
            movimentationOld = moveRepository.findById(movement.getId()).orElse(null);
        }


        updateBalance(movement, movimentationOld);
        moveRepository.save(movement);
        return movement;
    }

    public void updateBalance(Movimentation movement, Movimentation movimentationOld){
        if(movement.getRegister() != null){
            Register registerOrigin = registerService.findOne(movement.getRegister().getId());
            Register registerDestination = null;

            if(movement.getRegisterDestination() != null && movement.getRegisterDestination().getId() != null){
                registerDestination = registerService.findOne(movement.getRegisterDestination().getId());
            }

            switch(movement.getTypeEnumMovimentation()){
                case RECEITA:
                    if (movimentationOld.getId() != null) {
                        registerOrigin.setBank_balance( registerOrigin.getBank_balance() - movimentationOld.getValue() );
                    }
                    addRegisterBankBalance(movement, registerOrigin);
                    break;
                case DESPESA:
                    if(movimentationOld.getId() != null){
                        registerOrigin.setBank_balance(registerOrigin.getBank_balance() + movimentationOld.getValue());
                    }
                    subRegisterBankBalance(movement, registerOrigin);
                    break;
                case TRANSFERENCIA_ENTRE_CONTAS:
                    if(movement.getRegisterDestination() != null) {
                        if(movimentationOld.getId() != null){
                            registerOrigin.setBank_balance(registerOrigin.getBank_balance() - movimentationOld.getValue());
                            registerDestination.setBank_balance(registerDestination.getBank_balance() + movimentationOld.getValue());
                        }
                        addRegisterBankBalance(movement, registerDestination);
                        subRegisterBankBalance(movement, registerOrigin);
                        registerService.save(registerDestination);
                    }
            }
            registerService.save(registerOrigin);
        }
    }

    private void addRegisterBankBalance(Movimentation movement, Register register){
        register.setBank_balance((register.getBank_balance() != null ? register.getBank_balance(): 0) + movement.getValue());
    }

    private void subRegisterBankBalance(Movimentation movement, Register register){
        register.setBank_balance((register.getBank_balance() != null ? register.getBank_balance() : 0) - movement.getValue());
    }

    @Override
    public Movimentation findOne(Long id) {
        return moveRepository.findById(id).orElse(null);
    }

    @Override
    public List<Movimentation> findAllByUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.findByUsername(principal.toString());
        Long userId = user.getId();
        return moveRepository.findAllByUserId(userId);
    }

    @Override
    public List<Movimentation> findAll() {
        return moveRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        moveRepository.deleteById(id);
    }
}
