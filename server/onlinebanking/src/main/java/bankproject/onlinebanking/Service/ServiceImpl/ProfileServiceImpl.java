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

        System.out.println("i'm here above check");
        System.out.println("dekho ye h Id" + user.getUserId());
        if (userRepo.existsById(user.getUserId())) {
            System.out.println("i'm here aftercheck");
            userRepo.save(user);
        }

        return user;

    }

}
