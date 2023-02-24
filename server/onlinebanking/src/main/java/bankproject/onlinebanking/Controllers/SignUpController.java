package bankproject.onlinebanking.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bankproject.onlinebanking.Model.User;

import bankproject.onlinebanking.Service.SignUpService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/registration")
@AllArgsConstructor
public class SignUpController {

    @Autowired
    private SignUpService signUpService;

    @PostMapping
    public User Signup(@RequestBody User user) {

        return signUpService.createUser(user);

    }

}
