package bankproject.onlinebanking.Service.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Repository.UserRepository;
import bankproject.onlinebanking.Service.UserService;

@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserRepository userRepo;

    @Override
    public User findById(String userId) {
       return userRepo.findById(userId).get();
    }

    @Override
    public List<User> findAll() {
        return userRepo.findAll();
    }

    @Override
    public User findByEmail(String email) {
       User thisuser = userRepo.findByEmail(email); 
       return thisuser;
    }

    
    
}
    

