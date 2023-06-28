package br.edu.utfpr.server.dto;

import br.edu.utfpr.server.enums.TypeEnumMovimentation;
import lombok.Data;
import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class MovimentationDto {

    private Long id;

    @NotNull
    private Double value;

    @Size(min = 2, max = 1024)
    @Column(length = 1024)
    private String description;

    @NotNull
    private String date;

    private RegisterDto register;

    private RegisterDto registerDestination;

    @NotNull
    private TypeEnumMovimentation typeEnumMovimentation;

    @NotNull
    private String type;
}
