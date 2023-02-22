package bankproject.onlinebanking.Repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bankproject.onlinebanking.Model.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    // @Query(value = "select * from userdata where userid =:userid", nativeQuery =
    // true)
    // public boolean existsByUUID(UUID userid);

    @Query(value = "select * from userdata", nativeQuery = true)
    List<User> getAllUsers();

}
