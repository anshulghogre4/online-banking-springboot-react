package bankproject.onlinebanking.Service;

import org.springframework.stereotype.Service;

import bankproject.onlinebanking.Model.User;

public interface LoginService {

    public User findByEmail(String email);

}
