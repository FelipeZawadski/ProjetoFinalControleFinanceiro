package br.edu.utfpr.server;

import br.edu.utfpr.server.model.Register;
import br.edu.utfpr.server.repository.RegisterRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class RegisterControllerTests {

    @Autowired
    TestRestTemplate testRestTemplate;

    @Autowired
    RegisterRepository registerRepository;

    @BeforeEach
    private void cleanup() {
        registerRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void postRegister_whenRegisterIsValid_receiveCreated() {
        Register register = createValidRegister();

        ResponseEntity<Object> response =
                testRestTemplate.postForEntity("/registers", register, Object.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    }

    private Register createValidRegister() {
        Register register = new Register();
        register.setAgency("214-4");
        register.setBank("Banco do Brasil");
        register.setAccount("888-88");
        register.setAccountType("Corrente");

        return register;
    }

}
