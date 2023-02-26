package bankproject.onlinebanking.Service.ServiceImpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Model.UserDetail;
import bankproject.onlinebanking.Repository.UserDetailsRepository;
import bankproject.onlinebanking.Repository.UserRepository;
import bankproject.onlinebanking.Service.ProfileService;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Override
    public User updateUser(UserDetail userDetails, String userId) {

        User theUser = userRepo.findById(userId).get();

        theUser.setUserdetails(userDetails);

        User savingUpdatedUser = userRepo.save(theUser);

        return savingUpdatedUser;

    }
}
