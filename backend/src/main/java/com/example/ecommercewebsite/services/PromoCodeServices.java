package com.example.ecommercewebsite.services;

import com.example.ecommercewebsite.models.PromoCode;
import com.example.ecommercewebsite.Repositories.PromoCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PromoCodeServices {

    @Autowired
    private PromoCodeRepository promoRepo;

    public PromoCode findByCode(String code) {
        return promoRepo.findByCode(code).orElse(null);
    }

    public PromoCode create(PromoCode promo) {
        return promoRepo.save(promo);
    }
}
