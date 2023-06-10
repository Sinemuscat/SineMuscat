package muscat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component
public class UserListPrinter {
    private UserDao userDao;
    private UserPrinter printer;

    public UserListPrinter() {

    }
    public UserListPrinter(UserDao userDao, UserPrinter printer) {
        this.userDao = userDao;
        this.printer = printer;
    }

    @Autowired
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
    @Autowired
    public void setUserPrinter(UserPrinter printer) {
        this.printer = printer;
    }
    public void printAll() {
        Collection<User> users = userDao.selectAll();
        users.forEach(e -> printer.print(e));
    }
}
