package com.example.ecommercewebsite.controllers;

import com.example.ecommercewebsite.Repositories.OrderRepository;
import com.example.ecommercewebsite.models.Order;
import com.example.ecommercewebsite.models.PromoCode;
import com.example.ecommercewebsite.services.OrderServices;
import com.example.ecommercewebsite.services.PromoCodeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderServices service;

    @Autowired
    private OrderRepository repo;

    @Autowired
    private PromoCodeServices promoservice;

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        if (order.getStatus() == null) {
            order.setStatus(Order.Status.PENDING);
        }

        if (order.getPlacedAt() == null) {
            order.setPlacedAt(LocalDateTime.now());
        }


        if (order.getPromo() != null && order.getPromo().getCode() != null) {
            PromoCode promo = promoservice.findByCode(order.getPromo().getCode());
            if (promo != null) {
                order.setPromo(promo);
            } else {
                order.setPromo(null);
            }
        }


        if (order.getOrderItems() != null && !order.getOrderItems().isEmpty()) {
            double total = order.getOrderItems().stream()
                    .filter(i -> i.getPrice() != null && i.getQuantity() != null)
                    .mapToDouble(i -> i.getPrice() * i.getQuantity())
                    .sum();

            order.setTotal(total);

            order.getOrderItems().forEach(item -> item.setOrder(order));
        }

        return service.createOrder(order);
    }


    @PutMapping("/{id}/cancel")
    public ResponseEntity<String> cancelOrder(@PathVariable Long id) {
        String response = service.cancelOrder(id);
        if (response.contains("not found")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else if (response.contains("cannot")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        return ResponseEntity.ok(response);
    }
    @GetMapping
    public List<Order> getAll() {
        return service.getAllOrders();
    }
    @GetMapping("/{id}")
    public Order getById(@PathVariable Long id) {
        return service.getById(id);
    }
}
