package com.duongconglong.example005.service.impl;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.duongconglong.example005.config.UserInfoConfig;
import com.duongconglong.example005.entity.User;
import com.duongconglong.example005.exceptions.ResourceNotFoundException;
import com.duongconglong.example005.repository.UserRepo;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    
    @Autowired
    private UserRepo userRepo;

    // Phương thức này được gọi khi hệ thống cần tải thông tin người dùng để xác thực
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        // Tìm kiếm người dùng trong cơ sở dữ liệu dựa trên email (tên người dùng)
        Optional<User> user = userRepo.findByEmail(username);
        
        // Nếu tìm thấy người dùng, tạo đối tượng UserInfoConfig và trả về
        // Nếu không tìm thấy, ném ra ngoại lệ ResourceNotFoundException
        return user.map(UserInfoConfig::new)
            .orElseThrow(() -> new ResourceNotFoundException("User", "email", username));
    }
}
