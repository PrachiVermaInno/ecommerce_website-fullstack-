package com.example.ecommercewebsite.services;

import com.example.ecommercewebsite.models.Order;
import com.example.ecommercewebsite.Repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServices {

    @Autowired
    private OrderRepository repo;

    @Transactional
    public Order createOrder(Order order) {

        order.setStatus(order.getStatus() == null ? Order.Status.PENDING : order.getStatus());
        order.setPlacedAt(LocalDateTime.now());
        return repo.save(order);
    }

    public List<Order> getAllOrders() {
        return repo.findAll();
    }

    public Order getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Scheduled(fixedRate = 60 * 60 * 1000) // runs every hour
    public void autoDeliverOrders() {
        List<Order> pendingOrders = repo.findAll().stream()
                .filter(o -> o.getStatus() == Order.Status.PENDING)
                .toList();

        for (Order order : pendingOrders) {
            LocalDateTime placedAt = order.getPlacedAt();
            if (placedAt != null && placedAt.plusHours(6).isBefore(LocalDateTime.now())) {
                order.markAsDelivered();
                repo.save(order);
                System.out.println("Order ID " + order.getId() + " marked as delivered automatically.");
            }
        }
    }

    @Transactional
    public String cancelOrder(Long id) {
        Order order = repo.findById(id).orElse(null);
        if (order == null) {
            return "Order not found";
        }
        if (order.getStatus() == Order.Status.DELIVERED) {
            return "Delivered orders cannot be cancelled";
        }
        if (order.getStatus() == Order.Status.CANCELLED) {
            return "Order already cancelled";
        }

        order.cancelOrder();
        repo.save(order);
        return "Order cancelled successfully";
    }

}
