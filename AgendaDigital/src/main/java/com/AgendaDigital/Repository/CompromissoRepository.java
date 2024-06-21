package com.AgendaDigital.Repository;

import com.AgendaDigital.Model.Compromisso;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompromissoRepository extends JpaRepository<Compromisso, Long> {
    Page<Compromisso> findByUsuarioId(Long usuarioId, Pageable pageable);
}
