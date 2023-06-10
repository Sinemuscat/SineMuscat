package muscat;

import java.time.LocalDateTime;
import java.util.Date;

public class RegisterRequest {
    private String user_id;
    private String password;
    private String confirmPassword;
    private String name;
    private char gender;
    private String phoneNumber;
    private String email;
    private String walletAddress;
    public String getUserId() { return user_id; }
    public void setUserId(String user_id) {this.user_id = user_id;}

    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }
    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword){
        this.confirmPassword = confirmPassword;
    }

    public String getName() {
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender){
        this.gender = gender;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber){
        this.phoneNumber = phoneNumber;
    }

    public String getWalletAddress() {
        return walletAddress;
    }

    public void setWalletAddress(String walletAddress) {
        this.walletAddress = walletAddress;
    }

    public boolean isPasswordEqualToConfirmPassword() {
        return password.equals(confirmPassword);
    }


}
