package bankproject.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bankproject.onlinebanking.Model.Transactions;

@Repository
public interface TransactionRepository extends JpaRepository<Transactions, Integer> {

}
