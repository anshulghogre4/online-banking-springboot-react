package bankproject.onlinebanking.Service;


import java.util.List;

import bankproject.onlinebanking.Model.BankAccount;
import bankproject.onlinebanking.Model.Transactions;
import bankproject.onlinebanking.Model.User;

public interface TransactionService {
    public List<Transactions> getDetailsByAccount(BankAccount bankAccount);
    public List<Transactions> getTransactionsByReceiver(long toAccount);
    public Transactions save(Transactions theTransactions);
    public Transactions setTransactions(BankAccount bankAccount, long toAccount, double amount, String description, String status);
    public Transactions getTransactionsById(int transactionId);
}
