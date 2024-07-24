package com.fibbo.imanager.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.fibbo.imanager.exception.EntityAlreadyExists;
import com.fibbo.imanager.exception.EntityNotFound;
import com.fibbo.imanager.model.Product;
import com.fibbo.imanager.repository.ProductRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {
    
    private final ProductRepo repo;

    public Product find(Long id){
        return repo.findById(id).orElseThrow(() -> new EntityNotFound(String.format("Produto com id %d não encontrado", id)));
    }

    public Product addProduct(Product newProduct){
        Product productExist = repo.findByCode(newProduct.getCode());
        if(productExist == null){
            return repo.save(newProduct);
        }
        throw new EntityAlreadyExists(String.format("Produto com código %s já cadastrado", newProduct.getCode()));
    }

    public Product updateProduct(Product productUpdated){
        Product oldProd = repo.findByCode(productUpdated.getCode());
        if(productUpdated.getCode().equals(oldProd.getCode())){
            return repo.saveAndFlush(productUpdated);
        }
        throw new EntityAlreadyExists(String.format("Produto com código %s já cadastrado", productUpdated.getCode()));
    }

    public void deleteProduct(Long id){
        find(id);
        repo.deleteById(id);
    }

    public List<Product> allProductByUser(Long userID){
        return repo.findAllByUser(userID);
    }
}