package bankproject.onlinebanking.Service;

import org.springframework.stereotype.Service;

import bankproject.onlinebanking.Execptions.UserNotFoundException;
import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Requests.LoginRequest;

public interface LoginService {

    public User findByEmail(LoginRequest loginReq) throws UserNotFoundException;

}
