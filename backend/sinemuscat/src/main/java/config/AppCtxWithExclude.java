package config;

import muscat.UserDao;
import muscat.UserPrinter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Configuration
@ComponentScan(basePackages = {"muscat"},
        excludeFilters = {
            @Filter(type= FilterType.ANNOTATION, classes = {NoProduct.class, ManualBean.class}),
            @Filter(type= FilterType.REGEX, pattern = "muscat.*Dao")
        } )
public class AppCtxWithExclude {

    @Bean
    @Qualifier("printer")
    public UserPrinter userPrinter1(){
        return new UserPrinter();
    }
}
