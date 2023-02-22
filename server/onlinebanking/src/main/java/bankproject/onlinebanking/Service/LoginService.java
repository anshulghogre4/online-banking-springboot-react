package bankproject.onlinebanking.Service;

import org.springframework.stereotype.Service;

import bankproject.onlinebanking.Model.User;

@Service
public interface LoginService {

    public User findByEmail(String email);

}
