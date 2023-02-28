package bankproject.onlinebanking.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bankproject.onlinebanking.Model.Beneficiaries;

@Repository
public interface BeneficiaryRepository extends JpaRepository<Beneficiaries, Integer> {

    @Query(value = "select * from beneficiaries where user_userid=?1", nativeQuery = true)
    public List<Beneficiaries> findAllByUserId(String userId);

}
