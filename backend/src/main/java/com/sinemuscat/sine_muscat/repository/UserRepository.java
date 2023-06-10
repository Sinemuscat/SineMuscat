package com.sinemuscat.sine_muscat.repository;

import com.sinemuscat.sine_muscat.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
}
