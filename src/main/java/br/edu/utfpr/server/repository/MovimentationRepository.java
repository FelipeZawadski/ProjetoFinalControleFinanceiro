package br.edu.utfpr.server.repository;

import br.edu.utfpr.server.model.Movimentation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MovimentationRepository extends JpaRepository<Movimentation, Long> {

    List<Movimentation> findAllByUserId(Long accId);

}
