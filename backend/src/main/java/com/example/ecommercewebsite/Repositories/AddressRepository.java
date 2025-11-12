package com.example.ecommercewebsite.Repositories;

import com.example.ecommercewebsite.models.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address,Long>{
}
