package bankproject.onlinebanking.Service;

import java.util.List;

import bankproject.onlinebanking.Model.User;

public interface UserService {

   public User findById(String userId);

   public List<User> findAll();

   public User findByEmail(String email);

}
