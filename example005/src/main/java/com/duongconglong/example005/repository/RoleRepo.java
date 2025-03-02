package com.duongconglong.example005.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.duongconglong.example005.entity.Role; // Đảm bảo đúng package cho entity Role

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {
}
