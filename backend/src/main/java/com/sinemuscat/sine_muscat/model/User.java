package com.sinemuscat.sine_muscat.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
@Entity
@Table(name = "USER")
public class User {
    @Id
    @Column
    private String user_id;
    @Column

    private String password;
    @Column

    private String name;
    @Column

    private char gender;
    @Column
    private String phone_number;
    @Column

    private String email;
    @Column

    private String wallet_address;
    @Column

    private int total_points;
    @Column

    private LocalDateTime register_date;
    @Column

    private String sns;

    public User(String user_id, String password, String name, char gender, String phone_number, String email, String wallet_address, int total_points, LocalDateTime register_date, String sns) {
        this.user_id = user_id;
        this.password = password;
        this.name = name;
        this.gender = gender;
        this.phone_number = phone_number;
        this.email = email;
        this.wallet_address = wallet_address;
        this.total_points = total_points;
        this.register_date = register_date;
        this.sns = sns;
    }

    public User() {

    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public String getPhoneNumber() {
        return phone_number;
    }

    public void setPhoneNumber(String phone_number) {
        this.phone_number = phone_number;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWalletAddress() {
        return wallet_address;
    }

    public void setWalletAddress(String wallet_address) {
        this.wallet_address = wallet_address;
    }

    public int getTotalPoints() {
        return total_points;
    }

    public void setTotalPoints(int total_points) {
        this.total_points = total_points;
    }

    public LocalDateTime getRegisterDate() {
        return register_date;
    }

    public void setRegisterDate(LocalDateTime register_date) {
        this.register_date = register_date;
    }

    public String getSns() {
        return sns;
    }

    public void setSns(String sns) {
        this.sns = sns;
    }
}
