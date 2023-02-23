package bankproject.onlinebanking.Service.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Repository.UserRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User theUser = userRepository.findByEmail(email);
        if (theUser == null) {
            throw new UsernameNotFoundException(email);
        }
        return theUser;

    }

}
