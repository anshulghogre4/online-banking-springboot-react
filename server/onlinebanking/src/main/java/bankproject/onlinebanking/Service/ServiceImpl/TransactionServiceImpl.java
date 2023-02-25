package bankproject.onlinebanking.Service.ServiceImpl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import bankproject.onlinebanking.Model.BankAccount;
import bankproject.onlinebanking.Model.Transactions;
import bankproject.onlinebanking.Repository.TransactionRepository;
import bankproject.onlinebanking.Service.TransactionService;

public class TransactionServiceImpl implements TransactionService {

    @Autowired
    TransactionRepository transactionRepository;

    @Override
    public List<Transactions> getDetailsByAccount(BankAccount bankAccount) {

        // if (transactionRepository.getDetailsByAccountNo(bankAccount.getAccountno())
        // != null) {
        // return null;
        // }
        // return
        // transactionRepository.getDetailsByAccountNo(bankAccount.getAccountno());
        return null;
    }

    @Override
    public List<Transactions> getTransactionsByReceiver(long toAccount) {

        // return transactionRepository.getTransactionsByToAccount(toAccount);
        return null;
    }

    @Override
    public Transactions save(Transactions transaction) {
        transactionRepository.save(transaction);
        // return
        // transactionRepository.getCurrentTransaction(transaction.getToAccount());
        return null;
    }

    @Override
    public Transactions setTransactions(BankAccount bankAccount, long toAccount, double amount, String description,
            String status) {
        Transactions newTransaction = new Transactions();
        newTransaction.setFromAccount(bankAccount.getAccountno());
        newTransaction.setToAccount(toAccount);
        newTransaction.setAmount(amount);
        newTransaction.setDescription(description);
        newTransaction.setTransactionStatus(status);
        // newTransaction.setTransactionDate(date);

        transactionRepository.save(newTransaction);
        // return
        // transactionRepository.getTransactionsByFromAccount(bankAccount.getAccountno());
        return null;

    }

    @Override
    public Transactions getTransactionsById(int transactionId) {
        if (transactionRepository.getById(transactionId) != null) {
            return null;
        }
        return transactionRepository.getById(transactionId);
    }

}