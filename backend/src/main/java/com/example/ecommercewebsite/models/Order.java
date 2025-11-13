package com.example.ecommercewebsite.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {


    public enum Status {
        PENDING,
        SHIPPED,
        DELIVERED,
        CANCELLED
    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double total;
    private Integer qty;
    private Double price;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.PENDING;

    private LocalDateTime placedAt = LocalDateTime.now();
    private LocalDateTime deliveredAt;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;



    @ManyToOne
    @JoinColumn(name = "promo_id")
    private PromoCode promo;


    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems = new ArrayList<>();

    public void markAsDelivered() {
        this.status = Status.DELIVERED;
        this.deliveredAt = LocalDateTime.now();
    }


    public void cancelOrder() {
        this.status = Status.CANCELLED;
    }


    public void calculateTotal() {
        this.total = orderItems.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();

        this.qty = orderItems.stream()
                .mapToInt(OrderItem::getQuantity)
                .sum();
    }
}
