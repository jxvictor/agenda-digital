package com.AgendaDigital.Controller;

import com.AgendaDigital.Model.Usuario;
import com.AgendaDigital.Service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/usuario", produces = "application/json")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @PostMapping()
    public ResponseEntity<Void> cadastrar(@RequestBody @Valid Usuario usuario){
        try {
            usuarioService.save(usuario);
            return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/obterTodos")
    public ResponseEntity<List<Usuario>> obterTodos(){
        try
        {
            return new ResponseEntity<List<Usuario>>(usuarioService.obterTodos(), HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping()
    public ResponseEntity<Page<Usuario>> listarTodos(Pageable pageable){
        try
        {
            return new ResponseEntity<Page<Usuario>>(usuarioService.findAll(pageable), HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<Page<Usuario>>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Usuario>> obterPorId(@PathVariable Long id){
        try {
            return new ResponseEntity<Optional<Usuario>>(usuarioService.findById(id), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<Optional<Usuario>>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> editar(@PathVariable(value="id") Long id, @RequestBody @Valid Usuario usuario) {
        Optional<Usuario> us = usuarioService.findById(id);
        try
        {
            usuario.setUsuario(us.get().getUsuario());
            usuario.setSenha(us.get().getSenha());
            usuarioService.save(usuario);
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
            usuarioService.remover(id);
            return ResponseEntity.ok().build();
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
