package com.example.ecommercewebsite.services;

import com.example.ecommercewebsite.models.OrderItem;
import com.example.ecommercewebsite.Repositories.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrderItemServices {

    @Autowired
    private OrderItemRepository orderItemRepo;

    public List<OrderItem> getAllItems() {
        return orderItemRepo.findAll();
    }

    public OrderItem getById(Long id) {
        return orderItemRepo.findById(id).orElse(null);
    }

    public OrderItem save(OrderItem item) {
        return orderItemRepo.save(item);
    }
}
