package bankproject.onlinebanking.Service.ServiceImpl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;

import bankproject.onlinebanking.Model.User;

import bankproject.onlinebanking.Repository.UserRepository;
import bankproject.onlinebanking.Service.SignUpService;

public class SignUpServiceImpl implements SignUpService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public User createUser(User user) {

        if (!userRepo.existsById(user.getUserid())) {
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
