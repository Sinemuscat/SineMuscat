package main;

import config.AppCtx;
import muscat.ChangePasswordService;
import muscat.UserNotFoundException;
import muscat.WrongIdPasswordException;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class MainForCPS {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(AppCtx.class);

        ChangePasswordService cps = ctx.getBean("changePwdSvc", ChangePasswordService.class);

        try {
            cps.changePassword("ygeenee@naver.com", "1234", "1212");
            System.out.println("암호를 변경했습니다.");
        } catch (UserNotFoundException e) {
            System.out.println("회원 데이터가 존재하지 않습니다.");
        } catch (WrongIdPasswordException e) {
            System.out.println("암호가 올바르지 않습니다.");
        }

        ctx.close();
    }


}
