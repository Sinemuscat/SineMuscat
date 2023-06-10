package main;

import config.AppCtx;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import muscat.User;
import muscat.UserDao;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
import java.util.List;

public class MainForUserDao {
    private static UserDao userDao;

    public static void main(String[] args) {
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(AppCtx.class);

        userDao = ctx.getBean(UserDao.class);

        selectAll();
        updateUser();
        insertUser();

        ctx.close();
    }

    private static void selectAll(){
        System.out.println("----- selectAll");
        int total = userDao.count();
        System.out.println("전체 데이터: " + total);
        List<User> users = userDao.selectAll();
        for (User u:users){
            System.out.println(u.getUser_id() + ":" + u.getName() + ":" + u.getEmail());
        }
    }
    private static void updateUser(){
        System.out.println("----- updateUser");
        User user = userDao.selectByUserId("ygeenee@naver.com");
        String oldPw = user.getPassword();
        String newPw = Double.toHexString(Math.random());
        user.changePassword(oldPw, newPw);

        userDao.update(user);
        System.out.println("암호 변경: " + oldPw + " > " + newPw);
    }

    private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMddHHmmss");
    private static void insertUser(){
        System.out.println("----- insertUser");

        String prefix = formatter.format(LocalDateTime.now());

        User user = new User(prefix, prefix, prefix, prefix.charAt(0), prefix, prefix, prefix, Integer.parseInt(prefix), prefix, LocalDateTime.now());
        userDao.insert(user);
        System.out.println(user.getUser_id() + "데이터 추가");
    }
}
