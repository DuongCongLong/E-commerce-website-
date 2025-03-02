package com.duongconglong.example005.exceptions;

public class UserNotFoundException extends Exception {
    private static final long serialVersionUID = 1L;

    public UserNotFoundException() {
        // Default constructor
    }

    public UserNotFoundException(String message) {
        super(message);
    }
}
