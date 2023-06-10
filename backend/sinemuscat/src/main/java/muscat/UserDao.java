package muscat;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.sql.Timestamp;
import java.util.List;

@Component
public class UserDao {
    private static JdbcTemplate jdbcTemplate;

    public UserDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public void update(User user) {
        jdbcTemplate.update(
                "update USER set name = ?, password = ? where user_id = ?",
                user.getName(),
                user.getPassword(),
                user.getUser_id());
    }
    public void insert(final User user) {
        jdbcTemplate.update( (con)-> {
            PreparedStatement pstmt = con.prepareStatement(
                    "insert into USER(user_id, password, name, birth, phoneNumber, email, walletAddress, registerDate, sns, totalPoints)" +
                            "values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

            pstmt.setString(1, user.getUser_id());
            pstmt.setString(2, user.getPassword());
            pstmt.setString(3, user.getName());
            pstmt.setString(4, String.valueOf(user.getGender()));
            pstmt.setString(5, user.getUser_id());
            pstmt.setString(6, user.getUser_id());
            pstmt.setString(7, user.getUser_id());
            pstmt.setTimestamp(8, Timestamp.valueOf(user.getRegisterDateTime()));
            pstmt.setString(9, user.getUser_id());
            pstmt.setString(10, user.getUser_id());
            return pstmt;
        });
    }

    public static User selectByUserId(String user_id) {
        List<User> results = jdbcTemplate.query(
            "select * from USER where user_id = ?",
            new UserRowMapper(),
            user_id);
        return results.isEmpty() ? null : results.get(0);
    }

    public List<User> selectAll() {
        List<User> results = jdbcTemplate.query("select * from USER", new UserRowMapper());
        return results;
    }

    public int count() {
        Integer count = jdbcTemplate.queryForObject(
                "select count(*) from USER", Integer.class);
        return count;
    }
}
