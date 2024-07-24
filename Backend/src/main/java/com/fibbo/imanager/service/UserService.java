package com.fibbo.imanager.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.fibbo.imanager.exception.EntityAlreadyExists;
import com.fibbo.imanager.exception.EntityNotFound;
import com.fibbo.imanager.model.User;
import com.fibbo.imanager.repository.UserRepo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepo repo;
    private final PasswordEncoder passwordEncoder;

    public User find(Long id){
        return repo.findById(id).orElseThrow(() -> new EntityNotFound(String.format("usuário com id %d não encontrado", id)));
    }

    public User addUser(User newUser){
        User userExist = repo.findByEmail(newUser.getEmail());
        if(userExist == null){
            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            return repo.save(newUser);
        }
        throw new EntityAlreadyExists(String.format("Usuário com email %s já está cadastrado", newUser.getEmail()));
    }

    public User updateUser(User userUpdated){
        User userExist = repo.findByEmail(userUpdated.getEmail());
        if(userExist == null){
            return repo.saveAndFlush(userUpdated);
        }
        throw new EntityAlreadyExists(String.format("Usuário com email %s já está cadastrado", userUpdated.getEmail()));
    }

    public void deleteUser(Long id){
        find(id);
        repo.deleteById(id);
    }
}