package bankproject.onlinebanking.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bankproject.onlinebanking.Model.Transactions;

@Repository
public interface TransactionRepository extends JpaRepository<Transactions, Integer> {

    @Query(value = "select * from transactions where from_account=?1", nativeQuery = true)
    public List<Transactions> getDetailsByAccountNo(long accountno);

    @Query(value = "select * from transactions where from_account=?1 order by transaction_date, transaction_time desc limit 1", nativeQuery = true)
    public Transactions getCurrentTransaction(long fromAccount);

    @Query(value = "select * from transactions where from_account=?1 order by transaction_date desc, transaction_time desc", nativeQuery = true)
    public Transactions getTransactionsByFromAccount(long accountno);

    @Query(value = "select * from transactions where to_account=?1 order by transaction_date desc, transaction_time desc", nativeQuery = true)
    public List<Transactions> getTransactionsByToAccount(long toAccount);

    @Query(value = "select * from transactions where from_account=?1 or to_account=?1  order by transaction_date desc, transaction_time desc", nativeQuery = true)
    public List<Transactions> getByAccount(long accountno);

}
