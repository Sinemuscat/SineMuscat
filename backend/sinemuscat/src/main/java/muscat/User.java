package muscat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

public class User {
    private String user_id;
    private String password;
    private String name;
    private char gender;
    private String phoneNumber;
    private String email;
    private String walletAddress;
    private int totalPoints;
    private LocalDateTime registerDate;
    private String sns;

    public User(String user_id, String password, String name, char gender, String phoneNumber, String email, String walletAddress, int totalPoints, String sns, LocalDateTime regDateTime) {
        this.user_id = user_id;
        this.password = password;
        this.name = name;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.walletAddress = walletAddress;
        this.totalPoints = totalPoints;
        this.sns = sns;
        this.registerDate = regDateTime;
    }

    void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getUser_id() {
        return user_id;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public char getGender() {
        return gender;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public String getWalletAddress() {
        return walletAddress;
    }

    public LocalDateTime getRegisterDateTime() {
        return registerDate;
    }

    public int getTotalPoints() {
        return totalPoints;
    }

    public String getSns() {
        return sns;
    }

    public void changePassword(String oldPassword, String newPassword) {
        if(!password.equals(oldPassword))
            throw new WrongIdPasswordException();
        this.password = newPassword;
    }
}
