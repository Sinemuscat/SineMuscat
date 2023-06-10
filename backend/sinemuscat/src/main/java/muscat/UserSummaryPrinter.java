package muscat;

public class UserSummaryPrinter extends UserPrinter {
    @Override
    public void print(User user) {
        System.out.printf("회원정보: 이메일=%s, 이름=%s\n", user.getEmail(), user.getName());
    }
}
