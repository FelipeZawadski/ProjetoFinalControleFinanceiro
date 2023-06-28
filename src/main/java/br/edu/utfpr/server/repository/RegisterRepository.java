package br.edu.utfpr.server.repository;

import br.edu.utfpr.server.model.Register;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RegisterRepository extends JpaRepository<Register, Long> {

    List<Register> findAllByUserId(Long userId);

}
