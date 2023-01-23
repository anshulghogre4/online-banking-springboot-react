package bankproject.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bankproject.onlinebanking.Model.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

}
