package com.duongconglong.example005.service;

import java.util.List;
import com.duongconglong.example005.entity.Address; // Sửa lại đúng package
import com.duongconglong.example005.payloads.AddressDTO; // Sửa lại đúng package

public interface AddressService {
    
    AddressDTO createAddress(AddressDTO addressDTO);
    
    List<AddressDTO> getAddresses();
    
    AddressDTO getAddress(Long addressId);
    
    AddressDTO updateAddress(Long addressId, AddressDTO addressDTO); // Sửa đối số từ Address sang AddressDTO
    
    String deleteAddress(Long addressId); // Sửa tên tham số để hợp lệ
}
