package com.sinemuscat.sine_muscat.controller;

import com.sinemuscat.sine_muscat.model.User;
import com.sinemuscat.sine_muscat.repository.UserRepository;
import com.sinemuscat.sine_muscat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
