package br.edu.utfpr.server.controller;

import br.edu.utfpr.server.shared.GenericResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("authentication")
public class AuthenticationController {

    @GetMapping
    public GenericResponse checkAuthentication() {
        return new GenericResponse("Autenticação realizada com sucesso.");
    }

}
