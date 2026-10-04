package com.example.inventory.service;

import com.example.inventory.exception.ProductNotFoundException;
import com.example.inventory.model.Product;
import com.example.inventory.model.ProductRequest;
import com.example.inventory.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> findAll(String category) {
        if (category == null || category.isBlank()) {
            return repository.findAll();
        }
        return repository.findByCategoryIgnoreCase(category);
    }

    public Product findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
    }

    public List<Product> findLowStock(int threshold) {
        return repository.findByQuantityLessThan(threshold);
    }

    @Transactional
    public Product create(ProductRequest req) {
        return repository.save(new Product(req.name(), req.category(), req.quantity(), req.price()));
    }

    @Transactional
    public Product update(Long id, ProductRequest req) {
        Product p = findById(id);
        p.setName(req.name());
        p.setCategory(req.category());
        p.setQuantity(req.quantity());
        p.setPrice(req.price());
        return repository.save(p);
    }

    @Transactional
    public void delete(Long id) {
        Product p = findById(id);
        repository.delete(p);
    }
}
