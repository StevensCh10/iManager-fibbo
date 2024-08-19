package com.fibbo.imanager.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.fibbo.imanager.model.Product;

public interface ProductRepo extends JpaRepository<Product, Long>{
    
    Product findByCode(String code);
    
    @Query(
        value = "SELECT * FROM product WHERE fk_user = :userID" + "",
        nativeQuery = true
    )
    List<Product> findAllByUser(@Param("userID") Long userID);
}
