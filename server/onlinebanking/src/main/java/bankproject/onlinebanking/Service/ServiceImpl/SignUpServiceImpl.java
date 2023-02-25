package bankproject.onlinebanking.Service.ServiceImpl;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import bankproject.onlinebanking.Model.User;

import bankproject.onlinebanking.Repository.UserRepository;
import bankproject.onlinebanking.Requests.SignUpRequest;
import bankproject.onlinebanking.Service.SignUpService;

@Service
public class SignUpServiceImpl implements SignUpService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    PasswordEncoder passwordEncoded;

    @Override
    public User createUser(User user) {

        user.setPassword(passwordEncoded.encode(user.getPassword()));
        return userRepo.save(user);

    }

    @Override
    public Optional<User> getAUser(UUID userId) {

        Optional<User> user = userRepo.findById(userId);

        return user;
    }

    @Override
    public List<User> GetAllUsers() {

        List<User> users = null;

        users = userRepo.getAllUsers();

        return users;
    }

    @Override
    public boolean checkEmail(String email) {
        if (userRepo.findByEmail(email) != null)
            return true;
        return false;
    }

    // @Override
    // public User findByResetPasswordToken(String token) {
    // return userRepo.findByResetPasswordToken(token);
    // }

    // @Override
    // public void updateResetPasswordToken(String token, String email) {
    // User theUser = userRepo.findByEmail(email);
    // theUser.setResetPasswordToken(token);
    // userRepo.save(theUser);
    // }

    // @Override
    // public void updatePassword(String password, String token) {
    // User theUser = userRepo.findByResetPasswordToken(token);
    // theUser.setPassword(passwordEncoded.encode(password));
    // theUser.setResetPasswordToken(null);
    // userRepo.save(theUser);
    // }

    // @Override
    // public User findByOTP(String otp) {
    // return userRepo.findByotp(otp);
    // }

    // @Override
    // public void updateStatus(String otp) {
    // // TODO Auto-generated method stub
    // throw new UnsupportedOperationException("Unimplemented method
    // 'updateStatus'");
    // }

    // @Override
    // public void updateOtp(String otp, String email) {
    // User theUser = userRepo.findByEmail(email);
    // theUser.setOtp(otp);
    // userRepo.save(theUser);
    // }

    @Override
    public void deleteAccount(String email) {
        userRepo.deleteUser(email);
    }

    @Override
    public User findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

}
