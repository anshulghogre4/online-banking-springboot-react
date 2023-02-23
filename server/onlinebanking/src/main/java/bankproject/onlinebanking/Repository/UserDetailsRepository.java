package bankproject.onlinebanking.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bankproject.onlinebanking.Model.UserDetail;

@Repository
public interface UserDetailsRepository extends JpaRepository<UserDetail, Integer> {

}
