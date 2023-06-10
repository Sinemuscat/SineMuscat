package config;

import muscat.*;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.time.format.DateTimeFormatter;

@Configuration
@ComponentScan(basePackages = {"muscat"})
@EnableTransactionManagement
public class AppCtx {
    @Bean(destroyMethod = "close")
    public DataSource dataSource() {
        DataSource ds = new DataSource();
        ds.setDriverClassName("com.mysql.cj.jdbc.Driver");
        ds.setUrl("jdbc:mysql://localhost:3306/sinemuscat?characterEncoding=utf8&serverTimezone=UTC&useSSL=false&allowPublicKeyRetrieval=true"); // 나중에 ssl 설정 'true' 로 설정시 ds.setTruststoreFile("/path/to/truststore"); ds.setTruststorePassword("pwd");
        ds.setUsername("root");
        ds.setPassword("0000");
        ds.setInitialSize(2);
        ds.setMaxActive(10);
        ds.setMaxIdle(10);
        ds.setTestWhileIdle(true);  // 유휴 커넥션 검사
        ds.setMinEvictableIdleTimeMillis(1000 * 60 * 2); // 최소 유휴 시간 2분
        ds.setTimeBetweenEvictionRunsMillis(1000 * 10);     // 10초 추가
        return ds;
    }

    @Bean
    public PlatformTransactionManager transactionManager() {
        DataSourceTransactionManager tm = new DataSourceTransactionManager();
        tm.setDataSource(dataSource());

        return tm;
    }

    @Bean
    public UserDao userDao(){
        return new UserDao(dataSource());
    }
    @Bean
    public DateTimeFormatter dateTimeFormatter() {
        return DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");
    }

    @Bean
    public UserRegisterService userRegSvc() {
        return new UserRegisterService(userDao());
    }

    @Bean
    public ChangePasswordService changePwdSvc() {
        ChangePasswordService pwdSvc = new ChangePasswordService();
        pwdSvc.setUserDao(userDao());
        return pwdSvc;
    }

    @Bean
    public UserPrinter userPrinter() {
        return new UserPrinter();
    }

    @Bean
    public UserListPrinter listPrinter() {
        return new UserListPrinter(userDao(), userPrinter());
    }

    @Bean
    public UserInfoPrinter infoPrinter() {
        UserInfoPrinter infoPrinter = new UserInfoPrinter();
        infoPrinter.setUserDao(userDao());
        infoPrinter.setPrinter(userPrinter());
        return infoPrinter;
    }


}