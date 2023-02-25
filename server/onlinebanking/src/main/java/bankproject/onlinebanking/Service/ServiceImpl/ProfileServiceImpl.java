package bankproject.onlinebanking.Service.ServiceImpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Model.UserDetail;
import bankproject.onlinebanking.Repository.UserRepository;
import bankproject.onlinebanking.Service.ProfileService;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public String updateUserr(User user) {

        if (userRepo.getUserWithId() != null) {
            // User theUser = userRepo.findById(user.getUserId()).get();
            System.out.println("i'm here aftercheck");
            return "isme ara kuch ";
        }

        System.out.println("ye dega null ka bacha");
        return "nahi ara kuch bhi";

    }

    @Override
    public User updateUser(UserDetail userDetails, String userId) {

        User theUser = userRepo.findById(userId).get();

        theUser.setUserdetails(userDetails);

        User savingUpdatedUser = userRepo.save(theUser);

        return savingUpdatedUser;

    }
}
