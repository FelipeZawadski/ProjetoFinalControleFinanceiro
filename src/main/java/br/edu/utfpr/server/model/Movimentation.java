package br.edu.utfpr.server.model;

import br.edu.utfpr.server.enums.TypeEnumMovimentation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity(name = "tb_movement")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Movimentation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Double value;

    @JoinColumn(name = "Register_id")
    @ManyToOne
    private Register register;

    @JoinColumn(name = "User_id")
    @ManyToOne
    private User user;

    @Size(min = 2, max = 1024)
    @Column(length = 1024)
    private String description;

    @NotNull
    private String date;

    @ManyToOne()
    @JoinColumn(name = "Register_Destination_id")
    private Register registerDestination;

    @NotNull
    private TypeEnumMovimentation typeEnumMovimentation;

    @NotNull
    private String type;
}
