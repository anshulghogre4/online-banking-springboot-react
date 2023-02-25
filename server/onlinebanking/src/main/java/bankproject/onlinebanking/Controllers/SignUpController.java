package bankproject.onlinebanking.Controllers;

import java.sql.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bankproject.onlinebanking.Model.Role;
import bankproject.onlinebanking.Model.User;

import bankproject.onlinebanking.Service.SignUpService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
public class SignUpController {

    @Autowired
    private SignUpService signUpService;

    /*
     * Accepting Only 4 properties
     * 
     * Signup FirstName,Last Name,email,password
     */

    @PostMapping("/signup")
    public ResponseEntity<User> Signup(@RequestBody User user) {

        if (signUpService.findByEmail(user.getEmail()) != null) {
            return new ResponseEntity<User>(HttpStatus.CONFLICT);
        }

        String userid = UUID.randomUUID().toString();
        user.setUserId(userid);
        user.setRole(Role.USER);
        user.setCreatedDate(new Date(System.currentTimeMillis()));
        signUpService.createUser(user);
        return new ResponseEntity<User>(user, HttpStatus.OK);

    }

}
