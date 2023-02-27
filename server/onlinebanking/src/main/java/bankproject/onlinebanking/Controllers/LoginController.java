package bankproject.onlinebanking.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bankproject.onlinebanking.Execptions.UserNotFoundException;
import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Requests.LoginRequest;
import bankproject.onlinebanking.Service.LoginService;

@RestController
@RequestMapping("api/v1")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<?> findByEmail(@RequestBody LoginRequest loginReq)
            throws UserNotFoundException, Exception {

        ResponseEntity<String> re = null;

        User user = loginService.findByEmail(loginReq);

        if (user == null) {
            return new ResponseEntity<String>("user not found", HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }

    }

}
