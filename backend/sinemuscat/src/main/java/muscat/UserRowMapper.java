package muscat;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserRowMapper  implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User(
            rs.getString("user_id"),
            rs.getString("password"),
            rs.getString("name"),
            rs.getString("gender").charAt(0),
            rs.getString("phoneNumber"),
            rs.getString("email"),
            rs.getString("walletAddress"),
            rs.getInt("totalPoints"),
            rs.getString("sns"),
            rs.getTimestamp("registerDate").toLocalDateTime());
        return user;
    }
}
