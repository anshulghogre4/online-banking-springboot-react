package bankproject.onlinebanking.Repository;

import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bankproject.onlinebanking.Model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    // @Query(value = "select * from userdata where userid =:userid", nativeQuery =
    // true)
    // public boolean existsByUUID(UUID userid);

    // @Query(value = "select * from userdata", nativeQuery = true)
    // public List<User> getAllUsers();

    public User findByEmail(String email);

    public User findByResetPasswordToken(String token);

    public User findByotp(String otp);

    @Query(value = "select * from userdata where userid = '079b8412-6517-484b-bb85-13f782aacc22'", nativeQuery = true)
    public User getUserWithId();

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM userdata WHERE email= :email", nativeQuery = true)
    void deleteUser(String email);

}
