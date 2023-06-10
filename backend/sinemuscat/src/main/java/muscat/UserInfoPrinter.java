package muscat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component("infoPrinter")
public class UserInfoPrinter {
    private UserDao userDao;
    private UserPrinter userPrinter;

    public void printUserInfo(String user_id) {
        User user = userDao.selectByUserId(user_id);
        if (user == null) {
            System.out.println("데이터 없음\n");
            return;
        }
        userPrinter.print(user);
        System.out.println();
    }

    @Autowired
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
    @Autowired
    public void setPrinter(UserPrinter userPrinter) {
        this.userPrinter = userPrinter;
    }
}
