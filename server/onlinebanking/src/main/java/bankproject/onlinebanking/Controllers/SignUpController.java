package bankproject.onlinebanking.Controllers;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/signup")
public class SignUpController {

    public String Signup(@RequestBody SignUpRequest user) {

    }

}
