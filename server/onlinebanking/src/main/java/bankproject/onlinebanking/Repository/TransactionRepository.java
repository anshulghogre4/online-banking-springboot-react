package bankproject.onlinebanking.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bankproject.onlinebanking.Model.Transactions;

@Repository
public interface TransactionRepository extends JpaRepository<Transactions, Integer> {

    // public List<Transactions> getDetailsByAccountNo(Long accountno);

    // public Transactions getCurrentTransaction(long fromAccount);

    // public Transactions getTransactionsByFromAccount(Long accountno);

    // public List<Transactions> getTransactionsByToAccount(long toAccount);

}
