package bankproject.onlinebanking.Service;

import java.util.UUID;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Requests.SignUpRequest;

public interface SignUpService {

    public User createUser(User user);

    public String createUser(SignUpRequest user);

    public Optional<User> getAUser(UUID userId);

    public List<User> GetAllUsers();

}