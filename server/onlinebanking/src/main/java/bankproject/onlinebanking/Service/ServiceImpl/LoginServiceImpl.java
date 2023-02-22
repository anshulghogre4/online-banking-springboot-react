package bankproject.onlinebanking.Service.ServiceImpl;

import org.springframework.stereotype.Service;

import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Repository.UserRepository;
import bankproject.onlinebanking.Service.LoginService;

@Service
public class LoginServiceImpl implements LoginService {

    private UserRepository userRepository;

    @Override
    public User findByEmail(String email) {

        User user = userRepository.findByEmail(email);

        if (user == null)
            throw new UserNotFoundException(ConstantMessages.getEmailNotRegisteredMessage());
        if (user.isEmailVerified() == false)
            throw new UserNotFoundException("Email Not Verified");
        boolean iscorrect = passwordEncoder.matches(login.getPassword(), user.getPassword());
        if (iscorrect == false)
            throw new UserNotFoundException(ConstantMessages.getPasswordincorrectmessage());
        else
            return user;

    }

}
