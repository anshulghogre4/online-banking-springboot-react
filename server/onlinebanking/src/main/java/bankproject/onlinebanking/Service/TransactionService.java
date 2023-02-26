package bankproject.onlinebanking.Service;


import java.util.List;

import org.springframework.http.ResponseEntity;

import bankproject.onlinebanking.Model.BankAccount;
import bankproject.onlinebanking.Model.Transactions;
import bankproject.onlinebanking.Model.User;

public interface TransactionService {
    public List<Transactions> getDetailsByAccount(long fromAccount);
    public List<Transactions> getTransactionsByReceiver(long toAccount);
    public Transactions save(Transactions theTransactions);
    public Transactions setTransactions(BankAccount bankAccount, long toAccount, double amount, String description, String status);
    public Transactions getTransactionsById(int transactionId);
    public List<Transactions> findAll();
    public List<Transactions> getAllByAccount(long accountno);
    public Transactions getCurrentTransaction(long accountno);
}
