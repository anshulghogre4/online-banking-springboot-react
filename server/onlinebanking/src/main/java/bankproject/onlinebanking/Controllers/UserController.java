package bankproject.onlinebanking.Controllers;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Service.ProfileService;
import bankproject.onlinebanking.Service.SignUpService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private SignUpService signUpService;

    @Autowired
    private ProfileService profileService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> allUsers() {

        return ResponseEntity.ok().body(signUpService.GetAllUsers());

    }

    @GetMapping("/auser")
    public ResponseEntity<Optional<User>> getAUser(@RequestParam String userid) {

        ResponseEntity<Optional<User>> re = null;

        Optional<User> theUser = signUpService.getAUser(userid);

        re = new ResponseEntity<Optional<User>>(theUser, HttpStatus.OK);

        return re;

    }

    @PutMapping("/uuser")
    public ResponseEntity<User> updateUserProfile(User user) {

        ResponseEntity<User> re = null;

        User theUser = profileService.updateUser(user);

        re = new ResponseEntity<User>(theUser, HttpStatus.OK);

        return re;

    }

}
