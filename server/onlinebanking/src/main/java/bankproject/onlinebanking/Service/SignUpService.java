package bankproject.onlinebanking.Service;

import java.util.UUID;

import javax.mail.MessagingException;

import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Requests.SignUpRequest;

public interface SignUpService {

    public User createUser(User user);

    public Optional<User> getAUser(UUID userId);

    public List<User> GetAllUsers();

    public boolean checkEmail(String email);

    // // public User findByResetPasswordToken(String token);

    // // public void updateResetPasswordToken(String token, String email);

    // // public void updatePassword(String password, String token);

    // // public User findByOTP(String otp);

    // // public void updateStatus(String otp);

    // // void updateOtp(String otp, String email);

    void deleteAccount(String email);

    public User findByEmail(String email);

}