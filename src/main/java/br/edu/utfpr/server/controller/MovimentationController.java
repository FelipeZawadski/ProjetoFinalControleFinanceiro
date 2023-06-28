package br.edu.utfpr.server.controller;

import br.edu.utfpr.server.dto.MovimentationDto;
import br.edu.utfpr.server.model.Movimentation;
import br.edu.utfpr.server.model.Register;
import br.edu.utfpr.server.service.MovimentationService;
import br.edu.utfpr.server.shared.GenericResponse;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("movements")
public class MovimentationController {

    private final MovimentationService moveService;
    private ModelMapper modelMapper;

    public MovimentationController(MovimentationService moveService, ModelMapper modelMapper) {
        this.moveService = moveService;
        this.modelMapper = modelMapper;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public GenericResponse createMovement(@RequestBody @Valid Movimentation movement) {
        moveService.save(movement);
        return new GenericResponse("Movimentação salva com sucesso");
    }

    @DeleteMapping("{id}")
    public GenericResponse delete(@PathVariable Long id) {
        moveService.delete(id);
        return new GenericResponse("Movimentação excluida com sucesso");
    }

    @GetMapping
    public ResponseEntity<List<MovimentationDto>> findAll() {
        return ResponseEntity.ok(
                moveService.findAll().stream()
                        .map(this::convertEntityToDto)
                        .collect(Collectors.toList())
        );
    }

    @GetMapping("{id}")
    public ResponseEntity<MovimentationDto> findOne(@PathVariable Long id) {
        return ResponseEntity.ok(convertEntityToDto(moveService.findOne(id)));
    }

    @GetMapping("userMovement")
    public ResponseEntity<List<MovimentationDto>> findAllByUser() {
        return ResponseEntity.ok(
                moveService.findAllByUser().stream()
                        .map(this::convertEntityToDto)
                        .collect(Collectors.toList())
        );
    }

    @PostMapping("calculate-total-input")
    public void calculateTotalInput(Movimentation movement, Movimentation movementOld) {
        this.moveService.updateBalance(movement, movementOld);
    }

    private MovimentationDto convertEntityToDto(Movimentation movement) {
        return modelMapper.map(movement, MovimentationDto.class);
    }
}
