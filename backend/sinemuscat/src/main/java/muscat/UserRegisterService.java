package muscat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class UserRegisterService {
    @Autowired
    private UserDao userDao;
    public UserRegisterService(){

    }
    public UserRegisterService(UserDao userDao){
        this.userDao = userDao;
    }

    public String regist(RegisterRequest req) {
        User user = UserDao.selectByUserId(req.getUserId());
        if(user != null){
            throw new DuplicateUserException("dup email" + req.getEmail());
        }

        User newUser = new User(
                req.getUserId(),
                req.getPassword(),
                req.getName(),
                req.getGender(),
                req.getPhoneNumber(),
                req.getEmail(),
                req.getWalletAddress(),
                0,
                null,
                LocalDateTime.now()
        );
        userDao.insert(newUser);
        return newUser.getUser_id();
    }
}
