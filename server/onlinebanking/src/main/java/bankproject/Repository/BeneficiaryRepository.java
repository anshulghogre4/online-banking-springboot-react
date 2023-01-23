package bankproject.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bankproject.onlinebanking.Model.Beneficiaries;

@Repository
public interface BeneficiaryRepository extends JpaRepository<Beneficiaries, Integer> {

}
