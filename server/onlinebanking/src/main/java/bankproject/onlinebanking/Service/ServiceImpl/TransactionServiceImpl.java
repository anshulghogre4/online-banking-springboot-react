package bankproject.onlinebanking.Service.ServiceImpl;



import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import bankproject.onlinebanking.Model.BankAccount;
import bankproject.onlinebanking.Model.Transactions;
import bankproject.onlinebanking.Repository.TransactionRepository;
import bankproject.onlinebanking.Service.TransactionService;

@Service
public class TransactionServiceImpl implements TransactionService{

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public List<Transactions> getDetailsByAccount(long fromAccount) {
        
        if(transactionRepository.getDetailsByAccountNo(fromAccount)==null)
        {
            return null;
        }
       return transactionRepository.getDetailsByAccountNo(fromAccount); 
    }

    @Override
    public List<Transactions> getTransactionsByReceiver(long toAccount) {

        if(transactionRepository.getTransactionsByToAccount(toAccount)==null)
        {
            return null;
        }
            return transactionRepository.getTransactionsByToAccount(toAccount);
        }

  
    @Override
    public Transactions save(Transactions transaction) {
        transactionRepository.save(transaction);
        return transactionRepository.getCurrentTransaction(transaction.getToAccount());
    }

    @Override
    public Transactions setTransactions(BankAccount bankAccount, long toAccount, double amount, String description, String status) {
            Transactions newTransaction = new Transactions();
            newTransaction.setFromAccount(bankAccount.getAccountno());
            newTransaction.setToAccount(toAccount);
            newTransaction.setAmount(amount);
            newTransaction.setDescription(description);
            newTransaction.setTransactionStatus(status);
            //newTransaction.setTransactionDate(date);

            transactionRepository.save(newTransaction);
            return transactionRepository.getTransactionsByFromAccount(bankAccount.getAccountno());

    }

    @Override
    public Transactions getTransactionsById(int transactionId) {
        if(transactionRepository.getById(transactionId)!=null)
        {
            return null;
        }
       return transactionRepository.getById(transactionId);
    }

    @Override
    public List<Transactions> findAll() {
        
        return transactionRepository.findAll(Sort.by(Sort.Direction.DESC, "transactionDate", "transactionTime"));
    }

    @Override
    public List<Transactions> getAllByAccount(long accountno) {
        return transactionRepository.getByAccount(accountno);
    }

    @Override
    public Transactions getCurrentTransaction(long accountno) {
        return transactionRepository.getCurrentTransaction(accountno);
    }

 

}