package com.AgendaDigital.Controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.AgendaDigital.Model.ERole;
import com.AgendaDigital.Model.Role;
import com.AgendaDigital.Model.Usuario;
import com.AgendaDigital.Payload.request.LoginRequest;
import com.AgendaDigital.Payload.request.SignupRequest;
import com.AgendaDigital.Payload.response.MessageResponse;
import com.AgendaDigital.Payload.response.UserInfoResponse;
import com.AgendaDigital.Repository.RoleRepository;
import com.AgendaDigital.Repository.UsuarioRepository;
import com.AgendaDigital.Security.jwt.JwtUtils;
import com.AgendaDigital.Security.services.UserDetailsImpl;
import jakarta.validation.Valid;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//for Angular Client (withCredentials)
//@CrossOrigin(origins = "*", maxAge = 3600, allowCredentials="true")
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UsuarioRepository usuarioRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

    List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());

    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
        .body(new UserInfoResponse(userDetails.getId(),
                                   userDetails.getUsername(),
                                   roles));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (usuarioRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Erro: O nome de usuário já está em uso!"));
    }

    // Create new user's account
    Usuario usuario = new Usuario(signUpRequest.getUsername(),
                         encoder.encode(signUpRequest.getPassword()));

    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role userRole = roleRepository.findByNome(ERole.ROLE_USER)
          .orElseThrow(() -> new RuntimeException("Erro: Role não encontrada."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
        case "admin":
          Role adminRole = roleRepository.findByNome(ERole.ROLE_ADMIN)
              .orElseThrow(() -> new RuntimeException("Erro: Role não encontrada."));
          roles.add(adminRole);

          break;
        case "mod":
          Role modRole = roleRepository.findByNome(ERole.ROLE_MODERATOR)
              .orElseThrow(() -> new RuntimeException("Erro: Role não encontrada."));
          roles.add(modRole);

          break;
        default:
          Role userRole = roleRepository.findByNome(ERole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Erro: Role não encontrada."));
          roles.add(userRole);
        }
      });
    }

    usuario.setRoles(roles);
    usuarioRepository.save(usuario);

    //return ResponseEntity.ok(new MessageResponse("Usuário registrado com sucesso!"));
    return ResponseEntity.status(HttpStatus.CREATED).body(new MessageResponse("Usuário registrado com sucesso!"));
  }

  @PostMapping("/signout")
  public ResponseEntity<?> logoutUser() {
    ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(new MessageResponse("Você foi desconectado!"));
  }
}
