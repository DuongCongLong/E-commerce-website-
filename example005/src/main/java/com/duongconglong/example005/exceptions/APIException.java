package com.duongconglong.example005.exceptions;

public class APIException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    // Default constructor
    public APIException() {
        super();
    }

    // Constructor with a custom message
    public APIException(String message) {
        super(message);
    }
}
