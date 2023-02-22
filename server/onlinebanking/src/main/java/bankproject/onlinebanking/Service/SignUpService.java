package bankproject.onlinebanking.Service;

import java.util.UUID;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import bankproject.onlinebanking.Model.User;

@Service
public interface SignUpService {

    public User createUser(User user);

    public Optional<User> getAUser(UUID userId);

    public List<User> GetAllUsers();

}