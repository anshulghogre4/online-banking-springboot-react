package bankproject.onlinebanking.Service.ServiceImpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bankproject.onlinebanking.Execptions.UserNotFoundException;
import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Model.UserDetail;
import bankproject.onlinebanking.Repository.UserDetailsRepository;
import bankproject.onlinebanking.Repository.UserRepository;
import bankproject.onlinebanking.Service.ProfileService;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public User createUserProfile(UserDetail userDetails, String userId) throws UserNotFoundException {

        if (userDetails.getAdhaar() == null || userDetails.getPan() == null || userDetails.getMobile() == null) {

            throw new UserNotFoundException("Provide mandatory fields");
        }

        User theUser = userRepo.findById(userId).get();
        userDetails.setUser(theUser);
        theUser.setUserdetails(userDetails);
        User savingUpdatedUser = userRepo.save(theUser);
        return savingUpdatedUser;

    }

    @Override
    public User updateUserProfile(UserDetail userDetails, String userId) throws UserNotFoundException {

        if (userDetails.getAdhaar() == null || userDetails.getPan() == null || userDetails.getMobile() == null) {

            throw new UserNotFoundException("Provide mandatory fields");
        }

        User theUser = userRepo.findById(userId).get();
        userDetails.setUser(theUser);
        theUser.setUserdetails(userDetails);
        User savingUpdatedUser = userRepo.save(theUser);
        return savingUpdatedUser;

    }
}
