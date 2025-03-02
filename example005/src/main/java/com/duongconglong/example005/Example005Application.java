package com.duongconglong.example005;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;

import com.duongconglong.example005.config.AppConstants;
import com.duongconglong.example005.entity.Role;
import com.duongconglong.example005.repository.RoleRepo;

import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import org.modelmapper.ModelMapper;

import java.util.List;

@SpringBootApplication
@SecurityScheme(name = "E-Commerce Application", scheme = "bearer", type = SecuritySchemeType.HTTP, in = SecuritySchemeIn.HEADER)
public class Example005Application implements CommandLineRunner {

    @Autowired
    private RoleRepo roleRepo;

    // Bean definition for ModelMapper
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    public static void main(String[] args) {
        SpringApplication.run(Example005Application.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            // Creating Role objects
            Role adminRole = new Role();
            adminRole.setRoleId(AppConstants.ADMIN_ID);
            adminRole.setRoleName("ADMIN");

            Role userRole = new Role();
            userRole.setRoleId(AppConstants.USER_ID);
            userRole.setRoleName("USER");

            // Saving the roles to the database
            List<Role> roles = List.of(adminRole, userRole);
            List<Role> savedRoles = roleRepo.saveAll(roles);

            // Printing the saved roles
            savedRoles.forEach(System.out::println);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}