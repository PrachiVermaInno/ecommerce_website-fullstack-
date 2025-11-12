package com.example.ecommercewebsite.controllers;

import com.example.ecommercewebsite.models.Order;

import com.example.ecommercewebsite.models.PromoCode;
import com.example.ecommercewebsite.services.OrderServices;
import com.example.ecommercewebsite.services.PromoCodeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderServices service;

    @Autowired
    private PromoCodeServices promoservice;
    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        if (order.getStatus() == null || order.getStatus().isEmpty()) {
            order.setStatus("PENDING");
        }

        if (order.getPlacedAt() == null) {
            order.setPlacedAt(LocalDateTime.now());
        }

        // ✅ Handle promo code safely (fetch from DB if provided)
        if (order.getPromo() != null && order.getPromo().getCode() != null) {
            PromoCode promo = promoservice.findByCode(order.getPromo().getCode());
            if (promo != null) {
                order.setPromo(promo);
            } else {
                order.setPromo(null);
            }
        }


        if (order.getItems() != null && !order.getItems().isEmpty()) {
            double total = order.getItems().stream()
                    .filter(i -> i.getPrice() != null && i.getQuantity() != null)
                    .mapToDouble(i -> i.getPrice() * i.getQuantity())
                    .sum();
            if ((order.getTotal() == null || order.getTotal() == 0.0) && order.getItems() != null) {
                double totalamt = order.getItems().stream()
                        .filter(i -> i.getPrice() != null && i.getQuantity() != null)
                        .mapToDouble(i -> i.getPrice() * i.getQuantity())
                        .sum();

                // Apply promo discount
                /*if (order.getPromo() != null && order.getPromo().getDiscount() != null) {
                    total -= total * order.getPromo().getDiscount();
                }*/

                order.setTotal(total);
            }



            order.setTotal(total);

            order.getItems().forEach(item -> item.setOrder(order));
        }
        return service.createOrder(order);
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
