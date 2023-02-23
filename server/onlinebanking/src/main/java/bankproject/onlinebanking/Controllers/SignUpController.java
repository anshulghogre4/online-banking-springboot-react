package bankproject.onlinebanking.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bankproject.onlinebanking.Requests.SignUpRequest;
import bankproject.onlinebanking.Service.SignUpService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/registration")
@AllArgsConstructor
public class SignUpController {

    @Autowired
    private SignUpService signUpService;

    @PostMapping
    public String Signup(@RequestBody SignUpRequest user) {

        return signUpService.createUser(user);

    }

}
