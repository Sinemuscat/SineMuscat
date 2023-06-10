package muscat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class ChangePasswordService {
    private UserDao userDao;

    @Transactional
    public void changePassword(String user_id, String oldPwd, String newPwd){
        User user = userDao.selectByUserId(user_id);
        if(user == null)
            throw new UserNotFoundException();

        user.changePassword(oldPwd, newPwd);
        userDao.update(user);
    }

    public void setUserDao(UserDao userDao){
        this.userDao = userDao;
    }
}
