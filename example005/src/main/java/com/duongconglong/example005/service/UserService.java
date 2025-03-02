package com.duongconglong.example005.service;

import com.duongconglong.example005.payloads.UserDTO; // Đảm bảo đúng package
import com.duongconglong.example005.payloads.UserResponse; // Đảm bảo đúng package

public interface UserService {
    
    UserDTO registerUser(UserDTO userDTO);
    
    UserResponse getAllUsers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
    
    UserDTO getUserById(Long userId);
    
    UserDTO updateUser(Long userId, UserDTO userDTO);
    
    String deleteUser(Long userId);
    
    UserDTO getUserByEmail(String email);
}
