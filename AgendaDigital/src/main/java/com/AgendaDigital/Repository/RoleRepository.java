package com.AgendaDigital.Repository;

import java.util.Optional;

import com.AgendaDigital.Model.ERole;
import com.AgendaDigital.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByNome(ERole nome);
}
