package com.example.ecommercewebsite.services;

import com.example.ecommercewebsite.models.Address;
import com.example.ecommercewebsite.Repositories.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AddressServices {

    @Autowired
    private AddressRepository addressRepo;

    public List<Address> getAllAddresses() {
        return addressRepo.findAll();
    }

    public Address save(Address address) {
        return addressRepo.save(address);
    }

    public Address getById(Long id) {
        return addressRepo.findById(id).orElse(null);
    }
}
