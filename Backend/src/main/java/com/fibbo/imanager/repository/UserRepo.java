package com.fibbo.imanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fibbo.imanager.model.User;

public interface UserRepo extends JpaRepository<User, Long>{
    
    User findByEmail(String email);
}
