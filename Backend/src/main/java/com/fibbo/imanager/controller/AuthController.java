package com.fibbo.imanager.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.fibbo.imanager.dto.RequestDTO;
import com.fibbo.imanager.dto.ResponseDTO;
import com.fibbo.imanager.model.User;
import com.fibbo.imanager.security.TokenService;
import com.fibbo.imanager.service.AuthService;
import com.fibbo.imanager.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final TokenService tokenService;

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public ResponseDTO authenticateUser(@Valid @RequestBody RequestDTO loginRequest) {
        ResponseDTO response = authService.authenticate(loginRequest.email(), loginRequest.password());
        return response;
    }

    @PostMapping("/validate")
    @ResponseStatus(HttpStatus.OK)
    public ResponseDTO validateToken(@Valid @RequestBody String token) {
        String email = tokenService.validateToken(token);
        if (email != null) {
            var user = authService.findByEmail(email);
            return new ResponseDTO(user, token);
        } else {
            return null;
        }
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.OK)
    public ResponseDTO addUser(@Valid @RequestBody User newUser){
        return userService.addUser(newUser);
    }
}