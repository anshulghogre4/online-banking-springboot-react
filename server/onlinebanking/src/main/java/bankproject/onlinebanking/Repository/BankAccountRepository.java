package bankproject.onlinebanking.Repository;

import java.math.BigInteger;
import java.util.List;

import org.hibernate.sql.Select;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import bankproject.onlinebanking.Model.BankAccount;

@Repository
@EnableJpaRepositories
public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {

    @Query(value = "select * from bankaccount where accountno=?1", nativeQuery = true)
    public BankAccount findByAccountNo(long accountno);

    @Query(value = "select * from bankaccount where user_userid=?1", nativeQuery = true)
    public List<BankAccount> findAllByUserId(String userId);

   // public void deleteByAccountNo(long accountno);

}
