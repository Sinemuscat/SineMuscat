package com.sinemuscat.sine_muscat.service;

import com.sinemuscat.sine_muscat.model.User;
import com.sinemuscat.sine_muscat.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;
    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
