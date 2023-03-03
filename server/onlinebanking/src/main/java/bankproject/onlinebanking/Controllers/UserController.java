package bankproject.onlinebanking.Controllers;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import bankproject.onlinebanking.Execptions.UserNotFoundException;
import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Model.UserDetail;
import bankproject.onlinebanking.Service.ProfileService;
import bankproject.onlinebanking.Service.SignUpService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
        System.out.println("++++++ insdi all user controller 1");
        return ResponseEntity.ok().body(signUpService.GetAllUsers());

    }

    @GetMapping("/auser")
    public ResponseEntity<Optional<User>> getAUser(@RequestParam String userid) {

        ResponseEntity<Optional<User>> re = null;

        Optional<User> theUser = signUpService.getAUser(userid);

        re = new ResponseEntity<Optional<User>>(theUser, HttpStatus.OK);

        return re;

    }

    // in front end hide create button once profile created and there after show
    // only update button
    // for below req
    @PutMapping("/createprofile/{userId}")
    public ResponseEntity<?> createUserProfile(@RequestBody UserDetail userDetail, @PathVariable String userId)
            throws UserNotFoundException {

        User theUser = profileService.createUserProfile(userDetail, userId);

        if (theUser != null) {
            return new ResponseEntity<User>(theUser, HttpStatus.OK);
        } else
            return new ResponseEntity<String>("User Not Updated!", HttpStatus.EXPECTATION_FAILED);

    }

    // include userdeails id in json request in postman to update respective user
    @PutMapping("/updateprofile/{userId}")
    public ResponseEntity<?> updateUserProfile(@RequestBody UserDetail userDetail, @PathVariable String userId)
            throws UserNotFoundException {

        User theUser = profileService.updateUserProfile(userDetail, userId);

        if (theUser != null) {
            return new ResponseEntity<User>(theUser, HttpStatus.OK);
        } else
            return new ResponseEntity<String>("User Not Updated!", HttpStatus.EXPECTATION_FAILED);

    }

}
