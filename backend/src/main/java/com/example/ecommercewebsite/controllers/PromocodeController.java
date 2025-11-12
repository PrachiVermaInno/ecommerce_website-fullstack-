package com.example.ecommercewebsite.controllers;

import com.example.ecommercewebsite.models.PromoCode;
import com.example.ecommercewebsite.services.PromoCodeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/promos")
@CrossOrigin(origins = "http://localhost:3000")
public class PromocodeController {

    @Autowired
    private PromoCodeServices service;


    @GetMapping("/validate/{code}")
    public ResponseEntity<PromoCode> validate(@PathVariable String code) {
        PromoCode promo = service.findByCode(code);

        if (promo == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(promo);
    }


    @PostMapping
    public ResponseEntity<PromoCode> create(@RequestBody PromoCode promo) {
        PromoCode created = service.create(promo);
        return ResponseEntity.ok(created);
    }
}
