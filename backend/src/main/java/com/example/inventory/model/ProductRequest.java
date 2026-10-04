package com.example.inventory.model;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record ProductRequest(
        @NotBlank(message = "name is required") String name,
        @NotBlank(message = "category is required") String category,
        @Min(value = 0, message = "quantity cannot be negative") int quantity,
        @NotNull(message = "price is required")
        @DecimalMin(value = "0.0", inclusive = false, message = "price must be greater than 0") BigDecimal price
) {}
