package com.duongconglong.example005.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.duongconglong.example005.entity.Payment;

@Repository
public interface PaymentRepo extends JpaRepository<Payment, Long> {
}
