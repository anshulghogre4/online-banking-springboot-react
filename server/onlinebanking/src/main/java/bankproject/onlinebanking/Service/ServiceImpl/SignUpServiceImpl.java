package bankproject.onlinebanking.Service.ServiceImpl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
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
    PasswordEncoder passwordEncoded;

    @Override
    public String createUser(SignUpRequest user) {
        System.out.println("it sucks");
        return "IT ++++++ works";
    }

    @Override
    public User createUser(User user) {

        if (!userRepo.existsById(user.getUserid())) {
            user.setPassword(passwordEncoded.encode(user.getPassword()));
            userRepo.save(user);
        }
        return user;
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

}
