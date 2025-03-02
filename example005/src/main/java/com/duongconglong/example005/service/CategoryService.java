package com.duongconglong.example005.service;

import com.duongconglong.example005.entity.Category;
import com.duongconglong.example005.payloads.CategoryDTO;
import com.duongconglong.example005.payloads.CategoryResponse;

public interface CategoryService {

    CategoryDTO createCategory(Category category);

    CategoryResponse getCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    CategoryDTO updateCategory(Category category, Long categoryId);

    CategoryDTO getCategoryById(Long categoryId);

    String deleteCategory(Long categoryId);
    
}