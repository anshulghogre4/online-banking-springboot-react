package bankproject.onlinebanking.Service.ServiceImpl;

import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Repository.UserRepository;
import bankproject.onlinebanking.Service.ProfileService;

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
