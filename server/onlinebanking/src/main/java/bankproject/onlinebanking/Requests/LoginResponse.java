package bankproject.onlinebanking.Requests;

import org.springframework.security.config.web.servlet.headers.HeadersSecurityMarker;
import org.springframework.security.core.userdetails.UserDetails;

import bankproject.onlinebanking.Model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@HeadersSecurityMarker
@Builder
@Setter
@Getter
@ToString
public class LoginResponse {

    private String jwtToken;
    private User user;

}
