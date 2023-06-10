package muscat;

import org.jetbrains.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;

@Component
public class UserPrinter {
    private DateTimeFormatter dateTimeFormatter;

    @Autowired
    public UserPrinter() {
        this.dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");
    }
    public void print(User user) {
        if(dateTimeFormatter == null) {
            System.out.printf(
                    "회원 정보: 아이디=%s, 이메일=%s, 이름=%s, 등록일=%tF\n",
                    user.getUser_id(), user.getEmail(), user.getName(), user.getRegisterDateTime()
            );
        } else {
            System.out.printf(
                    "회원 정보: 아이디=%s, 이메일=%s, 이름=%s, 등록일=%tF\n",
                    user.getUser_id(), user.getEmail(), user.getName(), dateTimeFormatter.format(user.getRegisterDateTime())
            );
        }
    }

    @Autowired
    public void setDateTimeFormatter(@Nullable DateTimeFormatter dateTimeFormatter) {
        this.dateTimeFormatter = dateTimeFormatter;
    }
    /*
     * 자동 주입할 대상이 필수가 아닌 경우
     *  <방법 1>
    @Autowired()
    public void setDateTimeFormatter(DateTimeFormatter dateTimeFormatter) {
        this.dateTimeFormatter = dateTimeFormatter;
    }
     *  <방법 2>
    @Autowired
    public void setDateTimeFormatter(Optional<DateTimeFormatter> formatterOpt) {
        if(formatterOpt.isPresent()) {
            this.dateTimeFormatter = formatterOpt.get();
        } else {
            this.dateTimeFormatter = null;
        }
    }
    * <방법 3> 차이점 - 메서드가 호출되어(1은 호출자체 x), 존재하지 않으면 인자로 null을 전달
    @Autowired
    public void setDateTimeFormatter(@Nullable DateTimeFormatter dateTimeFormatter) {
        this.dateTimeFormatter = dateTimeFormatter;
    }
     */
}
