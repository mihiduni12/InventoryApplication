package com.example.inventory;

import com.example.inventory.model.Product;
import com.example.inventory.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.math.BigDecimal;

@Configuration
@Profile("!test")
public class DataSeeder {

    @Bean
    CommandLineRunner seed(ProductRepository repo) {
        return args -> {
            if (repo.count() > 0) return;
            repo.save(new Product("Olive Oil 5L", "Oils", 5, new BigDecimal("24.50")));
            repo.save(new Product("Basmati Rice 25kg", "Grains", 40, new BigDecimal("38.00")));
            repo.save(new Product("Chicken Breast 10kg", "Meat", 8, new BigDecimal("55.75")));
            repo.save(new Product("Tomato Sauce 3L", "Sauces", 60, new BigDecimal("9.20")));
            repo.save(new Product("Mozzarella 2kg", "Dairy", 12, new BigDecimal("18.90")));
        };
    }
}
