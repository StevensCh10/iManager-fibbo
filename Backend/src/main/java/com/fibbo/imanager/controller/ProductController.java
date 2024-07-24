package com.fibbo.imanager.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.fibbo.imanager.model.Product;
import com.fibbo.imanager.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class ProductController {
    
    private final ProductService service;

    @PostMapping()
    @ResponseStatus(HttpStatus.OK)
    public Product addProduct(@Valid @RequestBody Product newProduct){
        return service.addProduct(newProduct);
    }
    
    @PutMapping()
    @ResponseStatus(HttpStatus.OK)
    public Product updateProduct(@Valid @RequestBody Product productUpdated){
        return service.updateProduct(productUpdated);
    }

    @GetMapping("/{productID}")
    public Product getProduct(@PathVariable Long productID){
        return service.find(productID);
    }

    @GetMapping("/products/{userID}")
    public List<Product> getProductsByUser(@PathVariable Long userID){
        return service.allProductByUser(userID);
    }

    @DeleteMapping("/{productID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable Long productID){
        service.deleteProduct(productID);
    }
}