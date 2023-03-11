package bankproject.onlinebanking.Controllers;

import java.sql.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bankproject.onlinebanking.Model.Role;
import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Service.MailService;
import bankproject.onlinebanking.Service.SignUpService;
import lombok.AllArgsConstructor;
import net.bytebuddy.utility.RandomString;

@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
public class SignUpController {

    @Autowired
    private SignUpService signUpService;

    @Autowired
    private MailService mailService;

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
        String otp = RandomString.make(6);
        user.setUserId(userid);
        user.setOtp(otp);
        user.setRole(Role.USER);
        user.setCreatedDate(new Date(System.currentTimeMillis()));
        User theUser = signUpService.createUser(user);
        mailService.transactionMail(user.getEmail(), "Registration OTP code",
                "This is 6 digit otp code: " + otp + "\n\n Click here to verify: http://localhost:3000/signup/otp"
                        + "\n\nThank you.");
        return new ResponseEntity<User>(theUser, HttpStatus.OK);
    }

    @PostMapping("/otp")
    public ResponseEntity<?> checkOTP(@RequestBody User theUser) {
        if (signUpService.findByOTP(theUser.getOtp()) == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        signUpService.updateIsEmailVerified(theUser.getOtp());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/resend-otp/{userId}")
    public ResponseEntity<?> resendOTP(@PathVariable String userId) {

        User user = signUpService.findById(userId);
        String otp = RandomString.make(6);
        user.setOtp(otp);
        signUpService.save(user);
        mailService.transactionMail(user.getEmail(), "Registration OTP code",
                "This is 6 digit otp code: " + otp + "\n\n Click here to verify: http://localhost:3000/signup/otp"
                        + "\n\nThank you.");
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
