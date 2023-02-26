package bankproject.onlinebanking.Service;

import org.springframework.stereotype.Service;

import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Model.UserDetail;

public interface ProfileService {
    public User updateUser(UserDetail userDetails, String userId);

}
