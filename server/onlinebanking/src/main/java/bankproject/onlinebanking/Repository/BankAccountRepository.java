package bankproject.onlinebanking.Repository;

import java.math.BigInteger;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import bankproject.onlinebanking.Model.BankAccount;

@Repository
@EnableJpaRepositories
public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {

    BankAccount findByAccountNo(long accountNo);

    void deleteByEmail(String email);

}
