package com.example.ecommercewebsite.Repositories;

import com.example.ecommercewebsite.models.Order;
import com.example.ecommercewebsite.models.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {

}
