package bankproject.onlinebanking.Service;

import org.springframework.stereotype.Service;

import bankproject.onlinebanking.Model.User;

public interface ProfileService {
    public User updateUser(User user);
}
