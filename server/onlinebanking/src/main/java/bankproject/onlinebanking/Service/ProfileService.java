package bankproject.onlinebanking.Service;

import org.springframework.stereotype.Service;

import bankproject.onlinebanking.Execptions.UserNotFoundException;
import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Model.UserDetail;

public interface ProfileService {
    public User createUserProfile(UserDetail userDetails, String userId) throws UserNotFoundException;

    public User updateUserProfile(UserDetail userDetails, String userId) throws UserNotFoundException;

}
