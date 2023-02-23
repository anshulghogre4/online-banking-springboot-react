package bankproject.onlinebanking.Requests;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class SignUpRequest {

    private String firstname;
    private String lastname;
    private String email;
    private String password;
}
