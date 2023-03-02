package bankproject.onlinebanking.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Repository.UserRepository;
import bankproject.onlinebanking.Service.SignUpService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/user")
public class AccountOpenningReq {

    @Autowired
    private SignUpService signUpService;

    @GetMapping("/acopreq")
    public ResponseEntity<?> accountOpenningReq(@RequestParam String userId) {

        ResponseEntity<?> re = null;

        User theUser = signUpService.getAUser(userId).get();

        if (theUser.getUserdetails().getAdhaar() == null || theUser.getUserdetails().getPan() == null) {
            return new ResponseEntity<String>("Update Mandatory Details Please!", HttpStatus.BAD_REQUEST);
        }

        theUser.setAccountopenningreq(true);
        signUpService.save(theUser);

        if (theUser.isAccountopenningreq() == false) {
            return new ResponseEntity<String>("Account oppening request failed", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<String>("Account oppening request successfull", HttpStatus.OK);
        }
    }

}
