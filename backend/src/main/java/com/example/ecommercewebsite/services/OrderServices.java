package com.example.ecommercewebsite.services;

import com.example.ecommercewebsite.models.Order;
import com.example.ecommercewebsite.models.OrderItem;
import com.example.ecommercewebsite.Repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

/**
 * OrderService handles creating and managing orders.
 * This version does NOT use advanced TaskScheduler —
 * it uses a simple background thread to auto-update order status.
 */
@Service
public class OrderServices {

    @Autowired
    private OrderRepository repo;


    @Value("${ecommerce.order.delivery-delay-ms:21600000}")
    private long deliveryDelayMs;


    @Transactional
    public Order createOrder(Order order) {
        order.setStatus(order.getStatus() == null ? "PENDING" : order.getStatus());
        order.setPlacedAt(LocalDateTime.now());
        return repo.save(order);
    }



    public List<Order> getAllOrders() {
        return repo.findAll();
    }


    public Order getById(Long id) {
        return repo.findById(id).orElse(null);
    }


    private void autoDeliverAfterDelay(Long orderId) {
        try {

            Thread.sleep(deliveryDelayMs);


            Order order = repo.findById(orderId).orElse(null);
            if (order != null && !"Delivered".equalsIgnoreCase(order.getStatus())) {
                order.setStatus("Delivered");
                order.setDeliveredAt(LocalDateTime.now());
                repo.save(order);
                System.out.println("✅ Order " + orderId + " marked as Delivered automatically!");
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt(); // restore thread interrupt flag
            System.err.println("Auto-delivery thread interrupted for order " + orderId);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
