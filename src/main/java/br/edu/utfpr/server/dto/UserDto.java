package br.edu.utfpr.server.dto;

import lombok.Data;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class UserDto {

    private Long id;

    @NotNull
    @Size(min = 4)
    private String username;

    @NotNull
    private String email;

    private String phone;
}
