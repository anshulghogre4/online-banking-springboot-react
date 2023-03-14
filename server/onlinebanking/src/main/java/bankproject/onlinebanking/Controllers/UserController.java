package bankproject.onlinebanking.Controllers;

import java.io.*;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import bankproject.onlinebanking.Execptions.UserNotFoundException;
import bankproject.onlinebanking.Model.Mail;
import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Model.UserDetail;
import bankproject.onlinebanking.Requests.ChangePasswordReq;
import bankproject.onlinebanking.Requests.ImageResponse;
import bankproject.onlinebanking.Service.FileService;
import bankproject.onlinebanking.Service.MailService;
import bankproject.onlinebanking.Service.ProfileService;
import bankproject.onlinebanking.Service.SignUpService;
import net.bytebuddy.utility.RandomString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private SignUpService signUpService;

    @Autowired
    private ProfileService profileService;

    @Autowired
    private MailService mailService;

    @Autowired
    private FileService fileService;

    @Value("${user.profile.image.path}")
    private String imageUploadPath;

    private Logger logger = LoggerFactory.getLogger(UserController.class);

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

    @PutMapping("/en_dis_user/{userId}")
    public ResponseEntity<?> endisUser(@PathVariable String userId)
            throws UserNotFoundException {

        User theUser = signUpService.getAUser(userId).get();
        theUser.setEnabled(!theUser.isEnabled());
        signUpService.save(theUser);

        if (theUser != null) {
            return new ResponseEntity<User>(theUser, HttpStatus.OK);
        } else
            return new ResponseEntity<String>("Request Not Changed!", HttpStatus.EXPECTATION_FAILED);

    }

    @PostMapping("/forget-password")
    public ResponseEntity<?> sendForgetPassword(@RequestBody User theUser) {
        if (signUpService.findByEmail(theUser.getEmail()) == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        String token = RandomString.make(30);
        signUpService.updateResetPasswordToken(token, theUser.getEmail());
        String resetPasswordLink = "http://localhost:3000/reset-password?token=" + token;
        mailService.sendMail(theUser.getEmail(), resetPasswordLink);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/reset-password/{token}")
    public ResponseEntity<?> resetPassword(@RequestBody User theUser, @PathVariable String token) {
        User users = signUpService.findByResetPasswordToken(token);
        if (users == null) {

            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        signUpService.updatePassword(theUser.getPassword(), token);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/change-password/{userId}")
    public ResponseEntity<?> changePassword(@PathVariable String userId,
            @RequestBody ChangePasswordReq changePasswordReq) {
        boolean success = signUpService.changePassword(userId, changePasswordReq);
        if (success) {
            return ResponseEntity.ok("Password changed successfully");
        } else {
            return ResponseEntity.badRequest().body("Invalid current password");
        }
    }

    @PostMapping("/mail")
    public ResponseEntity<?> sendMail(@RequestBody Mail theMail) {
        theMail.setSentDate(new Date(System.currentTimeMillis()));
        mailService.send(theMail);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // upload user image
    @PostMapping("/image/{userId}")
    public ResponseEntity<ImageResponse> uploadUserImage(@RequestParam("image") MultipartFile image,
            @PathVariable String userId) throws IOException {
        String imageName = fileService.uploadFile(image, imageUploadPath);
        User user = signUpService.findById(userId);
        user.setImageName(imageName);
        signUpService.save(user);
        ImageResponse imageResponse = ImageResponse.builder().imageName(imageName).success(true)
                .message("image is uploaded successfully ").status(HttpStatus.CREATED).build();
        return new ResponseEntity<>(imageResponse, HttpStatus.CREATED);

    }

    // serve user image

    @GetMapping(value = "/image/{userId}")
    public void serveUserImage(@PathVariable String userId, HttpServletResponse response)
            throws IOException {
        User user = signUpService.findById(userId);
        logger.info("User image name : {} ", user.getImageName());
        InputStream resource = fileService.getResource(imageUploadPath, user.getImageName());
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(resource, response.getOutputStream());

    }

}
