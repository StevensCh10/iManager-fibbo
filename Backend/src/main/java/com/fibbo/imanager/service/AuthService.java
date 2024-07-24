package com.fibbo.imanager.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.fibbo.imanager.dto.ResponseDTO;
import com.fibbo.imanager.exception.EntityNotFound;
import com.fibbo.imanager.model.User;
import com.fibbo.imanager.repository.UserRepo;
import com.fibbo.imanager.security.TokenService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepo repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public ResponseDTO authenticate(String email, String password) {
        var user = repository.findByEmail(email);
        if (user != null) {
            return invalidPassword(password, user);
        }
        throw new EntityNotFound("Email não encontrado");
    }

    private ResponseDTO invalidPassword(String password, User user){
        if(passwordEncoder.matches(password, user.getPassword())){
            String token = this.tokenService.generateToken(user);
            return new ResponseDTO(user, token);
        }else{
            throw new EntityNotFound("Senha inválida");
        }
    }
    
    public User findByEmail(String email){
        var user = repository.findByEmail(email);
        if(user != null){
            return user;
        }
        throw new EntityNotFound("Email não encontrado");
    }

}