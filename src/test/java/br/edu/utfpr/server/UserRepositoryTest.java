package br.edu.utfpr.server;

import br.edu.utfpr.server.model.User;
import br.edu.utfpr.server.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class UserRepositoryTest {

    TestEntityManager testEntityManager;

    @Autowired
    UserRepository userRepository;

    @AfterEach
    @BeforeEach
    public void cleanup() {
        userRepository.deleteAll();
    }

    @Test
    public void findByUsername_whenUserExists_returnsUser() {
        User user = new User();
        user.setEmail("test-email");
        user.setPhone("test-phone");
        user.setUsername("test-username");
        user.setPassword("P4ssword");
        testEntityManager.persist(user);

        User userDB = userRepository.findUserByUsername("test-username");
        assertThat(userDB).isNotNull();
    }

    @Test
    public void findByUsername_whenUserExists_returnsNull() {
        User userDB = userRepository.findUserByUsername("test-username");
        assertThat(userDB).isNull();
    }

}
