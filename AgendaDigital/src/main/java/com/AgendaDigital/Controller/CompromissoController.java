package com.AgendaDigital.Controller;

import com.AgendaDigital.Model.Compromisso;
import com.AgendaDigital.Service.CompromissoService;
import com.AgendaDigital.Service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/compromisso", produces = "application/json")
public class CompromissoController {

    @Autowired
    CompromissoService compromissoService;

    @Autowired
    UsuarioService usuarioService;

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
    public ResponseEntity<org.springframework.data.domain.Page<Compromisso>> listarTodos(Pageable pageable){
        try
        {
            return new ResponseEntity<org.springframework.data.domain.Page<Compromisso>>(compromissoService.findAll(pageable), HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<Page<Compromisso>>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<Page<Compromisso>> getCompromissosByUsuario(@PathVariable Long usuarioId, Pageable pageable) {
        Page<Compromisso> compromissos = compromissoService.findByUsuarioId(usuarioId, pageable);
        return ResponseEntity.ok(compromissos);
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
        try {
            Optional<Compromisso> compromissoExistente = compromissoService.findById(id);
            if (compromissoExistente.isPresent()) {
                Compromisso compromissoAtualizado = compromissoExistente.get();
                compromissoAtualizado.setNome(compromisso.getNome());
                compromissoAtualizado.setInicio(compromisso.getInicio());
                compromissoAtualizado.setFim(compromisso.getFim());
                compromissoAtualizado.setUsuario(compromisso.getUsuario());
                compromissoService.save(compromissoAtualizado);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch(Exception e) {
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
