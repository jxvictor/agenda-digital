package com.AgendaDigital.Service;

import com.AgendaDigital.Model.Compromisso;
import com.AgendaDigital.Repository.CompromissoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompromissoService {

    @Autowired
    CompromissoRepository compromissoRepository;
    public void save(Compromisso compromisso) {
        compromissoRepository.save(compromisso);
    }

    public Page<Compromisso> findAll(Pageable pageable){
        return compromissoRepository.findAll(pageable);
    }
    public List<Compromisso> obterTodos() {
        return compromissoRepository.findAll();
    }

    public Optional<Compromisso> findById(Long id){
        return compromissoRepository.findById(id);
    }

    public void remover(Long id) {
        compromissoRepository.deleteById(id);
    }

    public Page<Compromisso> findByUsuarioId(Long usuarioId, Pageable pageable) {
        return compromissoRepository.findByUsuarioId(usuarioId, pageable);
    }
}
