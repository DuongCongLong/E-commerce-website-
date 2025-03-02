package com.duongconglong.example005.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.duongconglong.example005.entity.Address;
import com.duongconglong.example005.entity.User;
import com.duongconglong.example005.exceptions.APIException;
import com.duongconglong.example005.exceptions.ResourceNotFoundException;
import com.duongconglong.example005.repository.AddressRepo;
import com.duongconglong.example005.repository.UserRepo;
import com.duongconglong.example005.service.AddressService;
import com.duongconglong.example005.payloads.AddressDTO;
import jakarta.transaction.Transactional;

@Transactional
@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepo addressRepo;
    
    @Autowired
    private UserRepo userRepo;
    
    @Autowired
    private ModelMapper modelMapper;

    // Tạo mới địa chỉ
    @Override
    public AddressDTO createAddress(AddressDTO addressDTO) {
        // Lấy thông tin địa chỉ từ DTO
        String country = addressDTO.getCountry();
        String state = addressDTO.getState();
        String city = addressDTO.getCity();
        String pincode = addressDTO.getPincode();
        String street = addressDTO.getStreet();
        String buildingName = addressDTO.getBuildingName();

        // Kiểm tra nếu địa chỉ đã tồn tại
        Address addressFromDB = addressRepo.findByCountryAndStateAndCityAndPincodeAndStreetAndBuildingName(
                country, state, city, pincode, street, buildingName);
        
        if (addressFromDB != null) {
            throw new APIException("Address already exists with addressId: " + addressFromDB.getAddressId());
        }

        // Chuyển DTO thành đối tượng Address và lưu vào cơ sở dữ liệu
        Address address = modelMapper.map(addressDTO, Address.class);
        Address savedAddress = addressRepo.save(address);
        
        // Trả về AddressDTO đã lưu
        return modelMapper.map(savedAddress, AddressDTO.class);
    }

    // Lấy tất cả địa chỉ
    @Override
    public List<AddressDTO> getAddresses() {
        List<Address> addresses = addressRepo.findAll();
        return addresses.stream()
                .map(address -> modelMapper.map(address, AddressDTO.class))
                .collect(Collectors.toList());
    }

    // Lấy địa chỉ theo addressId
    @Override
    public AddressDTO getAddress(Long addressId) {
        Address address = addressRepo.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address", "addressId", addressId));
        return modelMapper.map(address, AddressDTO.class);
    }

    // Cập nhật địa chỉ
    @Override
    public AddressDTO updateAddress(Long addressId, AddressDTO addressDTO) {
        // Kiểm tra nếu địa chỉ đã tồn tại trong cơ sở dữ liệu
        Address addressFromDB = addressRepo.findByCountryAndStateAndCityAndPincodeAndStreetAndBuildingName(
                addressDTO.getCountry(), addressDTO.getState(), addressDTO.getCity(), addressDTO.getPincode(), 
                addressDTO.getStreet(), addressDTO.getBuildingName());
        
        if (addressFromDB == null) {
            // Nếu địa chỉ không tồn tại, lấy địa chỉ từ cơ sở dữ liệu bằng addressId
            addressFromDB = addressRepo.findById(addressId)
                    .orElseThrow(() -> new ResourceNotFoundException("Address", "addressId", addressId));
            
            // Cập nhật thông tin địa chỉ
            addressFromDB.setCountry(addressDTO.getCountry());
            addressFromDB.setState(addressDTO.getState());
            addressFromDB.setCity(addressDTO.getCity());
            addressFromDB.setPincode(addressDTO.getPincode());
            addressFromDB.setStreet(addressDTO.getStreet());
            addressFromDB.setBuildingName(addressDTO.getBuildingName());
            
            // Lưu địa chỉ đã cập nhật
            Address updatedAddress = addressRepo.save(addressFromDB);
            return modelMapper.map(updatedAddress, AddressDTO.class);
        } else {
            // Nếu địa chỉ đã tồn tại, thực hiện xóa và cập nhật cho người dùng
            List<User> users = userRepo.findByAddress(addressId);
    
            // Create a final or effectively final variable to be used in the lambda
            final Address finalAddressFromDB = addressFromDB;
            
            // Use finalAddressFromDB inside the lambda expression
            users.forEach(user -> user.getAddresses().add(finalAddressFromDB));
    
            // Delete and re-add the address (if necessary)
            deleteAddress(addressId);
    
            return modelMapper.map(finalAddressFromDB, AddressDTO.class);
        }
    }
     

    // Xóa địa chỉ
    @Override
    public String deleteAddress(Long addressId) {
        Address addressFromDB = addressRepo.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address", "addressId", addressId));
        
        // Xóa địa chỉ khỏi các người dùng liên quan
        List<User> users = userRepo.findByAddress(addressId);
        users.forEach(user -> {
            user.getAddresses().remove(addressFromDB);
            userRepo.save(user);
        });

        // Xóa địa chỉ khỏi cơ sở dữ liệu
        addressRepo.deleteById(addressId);
        return "Address deleted successfully with addressId: " + addressId;
    }
}
