package config;

import muscat.UserDao;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DbConfig {
    @Bean(destroyMethod = "close")
    public DataSource dataSource() {
        DataSource ds = new DataSource();
        ds.setDriverClassName("com.mysql.jdbc.Driver");
        ds.setUrl("jdbc:mysql://localhost/SineMuscat?characterEncoding=utf8");
        ds.setUsername("user");
        ds.setPassword("0000");
        ds.setInitialSize(2);
        ds.setMaxActive(10);
        ds.setTestWhileIdle(true);  // 유휴 커넥션 검사
        ds.setMinEvictableIdleTimeMillis(1000 * 60 * 2); // 최소 유휴 시간 2분
        ds.setTimeBetweenEvictionRunsMillis(1000 * 10);     // 10초 추가
        return ds;
    }

    @Bean
    public UserDao userDao(){
        return new UserDao(dataSource());
    }
}
