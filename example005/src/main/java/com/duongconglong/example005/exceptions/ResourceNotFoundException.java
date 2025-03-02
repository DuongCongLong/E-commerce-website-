package com.duongconglong.example005.exceptions;

public class ResourceNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    private String resourceName;
    private String field;
    private String fieldName;
    private Long fieldId;

    public ResourceNotFoundException() {
        // Default constructor
    }

    public ResourceNotFoundException(String resourceName, String field, String fieldName) {
        super(String.format("%s not found with %s: %s", resourceName, field, fieldName));
        this.resourceName = resourceName;
        this.field = field;
        this.fieldName = fieldName;
    }

    public ResourceNotFoundException(String resourceName, String field, Long fieldId) {
        super(String.format("%s not found with %s: %d", resourceName, field, fieldId));
        this.resourceName = resourceName;
        this.field = field;
        this.fieldId = fieldId;
    }

    // Getters for the exception properties
    public String getResourceName() {
        return resourceName;
    }

    public String getField() {
        return field;
    }

    public String getFieldName() {
        return fieldName;
    }

    public Long getFieldId() {
        return fieldId;
    }
}
