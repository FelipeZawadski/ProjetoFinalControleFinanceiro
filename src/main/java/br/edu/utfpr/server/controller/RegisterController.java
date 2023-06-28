package br.edu.utfpr.server.controller;

import br.edu.utfpr.server.dto.RegisterDto;
import br.edu.utfpr.server.model.Register;
import br.edu.utfpr.server.service.RegisterService;
import br.edu.utfpr.server.shared.GenericResponse;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("registers")
public class RegisterController {

    private final RegisterService registerService;
    private ModelMapper modelMapper;

    public RegisterController(RegisterService registerService, ModelMapper modelMapper) {
        this.registerService = registerService;
        this.modelMapper = modelMapper;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public GenericResponse createRegister(@RequestBody @Valid Register register) {
        registerService.save(register);
        return new GenericResponse("Registro inserido com sucesso");
    }

    @DeleteMapping("{id}")
    public GenericResponse delete(@PathVariable Long id) {
        registerService.delete(id);
        return new GenericResponse("Registro excluido com sucesso");
    }

    @GetMapping
    public ResponseEntity<List<RegisterDto>> findAll() {
        return ResponseEntity.ok(
                registerService.findAll()
                        .stream()
                        .map(this::convertEntityToDto)
                        .collect(Collectors.toList())
        );
    }

    @GetMapping("{id}")
    public ResponseEntity<RegisterDto> findOne(@PathVariable Long id) {
        return ResponseEntity.ok(convertEntityToDto(registerService.findOne(id)));
    }

    @GetMapping("/userRegister")
    public ResponseEntity<List<RegisterDto>> findAllByUser() {
        return ResponseEntity.ok(
                registerService.findByUserId()
                        .stream()
                        .map(this::convertEntityToDto)
                        .collect(Collectors.toList())
        );
    }

    private RegisterDto convertEntityToDto(Register register) {
        return modelMapper.map(register, RegisterDto.class);
    }

    @GetMapping("bank-balance/{id}")
    public Double getBankBalance(@PathVariable Long id) {
        return this.registerService.getBankBalance(id);
    }
}
