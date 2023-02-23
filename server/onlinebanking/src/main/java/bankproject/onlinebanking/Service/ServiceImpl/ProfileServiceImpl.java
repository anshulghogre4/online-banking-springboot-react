package bankproject.onlinebanking.Service.ServiceImpl;

import org.springframework.stereotype.Service;

import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Repository.UserRepository;
import bankproject.onlinebanking.Service.ProfileService;

@Service
public class ProfileServiceImpl implements ProfileService {

    private UserRepository userRepo;

    @Override
    public User updateUser(User user) {

        if (userRepo.existsById(user.getUserid())) {
            userRepo.save(user);
        }
        return user;
    }

}
