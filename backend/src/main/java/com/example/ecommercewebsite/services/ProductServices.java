package com.example.ecommercewebsite.services;

import com.example.ecommercewebsite.models.Product;
import com.example.ecommercewebsite.Repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductServices {

    @Autowired
    private ProductRepository repo;

    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    public Product getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<Product> getByCategory(String category) {
        return repo.findByCategory(category);
    }

    @Transactional
    public Product save(Product p) {
        // ensure creation rather than accidental merge with id set
        p.setId(null);
        return repo.save(p);
    }

    @Transactional
    public List<Product> saveAll(List<Product> products) {
        products.forEach(p -> p.setId(null));
        return repo.saveAll(products);
    }
}
