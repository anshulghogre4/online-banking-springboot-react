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

        return user;

    }

}
