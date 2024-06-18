package com.AgendaDigital.Controller;

import com.AgendaDigital.Model.Compromisso;
import com.AgendaDigital.Service.CompromissoService;
import jakarta.validation.Valid;
import org.hibernate.query.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/compromisso", produces = "application/json")
public class CompromissoController {

    @Autowired
    CompromissoService compromissoService;

    @GetMapping("/obterTodos")
    public ResponseEntity<List<Compromisso>> obterTodos(){
        try
        {
            return new ResponseEntity<List<Compromisso>>(compromissoService.obterTodos(), HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping()
    public ResponseEntity<String> cadastrar(@RequestBody @Valid Compromisso compromisso){
        try {
            compromissoService.save(compromisso);
            return new ResponseEntity<String>("Compromisso cadastrado com sucesso", HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping()
    public ResponseEntity<List<Compromisso>> listarTodos(){
        try
        {
            return new ResponseEntity<>(compromissoService.obterTodos(), HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Compromisso>> obterPorId(@PathVariable Long id){
        try {
            return new ResponseEntity<Optional<Compromisso>>(compromissoService.findById(id), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<Optional<Compromisso>>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> editar(@PathVariable(value="id") Long id, @RequestBody @Valid Compromisso compromisso) {
        Optional<Compromisso> us = compromissoService.findById(id);
        try
        {
            compromisso.setNome(us.get().getNome());
            compromisso.setInicio(us.get().getInicio());
            compromisso.setFim(us.get().getFim());
            compromissoService.save(compromisso);
            return ResponseEntity.ok().build();
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable long id){
        try
        {
            compromissoService.remover(id);
            return ResponseEntity.ok().build();
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
