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

    // Delay time for automatic delivery (default = 6 hours)
    // You can override it in application.properties
    @Value("${ecommerce.order.delivery-delay-ms:21600000}")
    private long deliveryDelayMs;

    /**
     * Place a new order, set its status to "Pending", and
     * schedule it to be automatically marked "Delivered" later.
     */
    @Transactional
    public Order createOrder(Order order) {
        order.setStatus(order.getStatus() == null ? "PENDING" : order.getStatus());
        order.setPlacedAt(LocalDateTime.now());
        return repo.save(order);
    }


    /**
     * Get all orders from the database.
     */
    public List<Order> getAllOrders() {
        return repo.findAll();
    }

    /**
     * Get a specific order by its ID.
     */
    public Order getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    /**
     * Simulates automatic order delivery after a delay.
     * Uses Thread.sleep for beginners instead of TaskScheduler.
     */
    private void autoDeliverAfterDelay(Long orderId) {
        try {
            // Sleep for the given delay (6 hours by default)
            // For testing, you can temporarily reduce this to 10000 (10 seconds)
            Thread.sleep(deliveryDelayMs);

            // Fetch order and mark it delivered
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
