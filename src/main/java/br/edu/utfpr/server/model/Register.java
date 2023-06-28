package br.edu.utfpr.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity(name = "tb_register")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Register {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotEmpty
    private String agency;

    @NotNull
    @NotEmpty
    private String bank;

    @JoinColumn(name = "User_id")
    @ManyToOne
    private User user;

    @NotNull
    @NotEmpty
    private String account;

    @NotNull
    private Double bank_balance = 0.0;

    @NotNull
    @NotEmpty
    private String accountType;
}
