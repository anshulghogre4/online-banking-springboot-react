package bankproject.onlinebanking.Service.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bankproject.onlinebanking.Model.BankAccount;
import bankproject.onlinebanking.Model.Transactions;
import bankproject.onlinebanking.Repository.TransactionRepository;
import bankproject.onlinebanking.Service.FundTransferService;

@Service
public class FundTransferServiceImpl implements FundTransferService{


    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public Transactions save(Transactions transactions) {
        return transactionRepository.save(transactions);
    }

    @Override
    public BankAccount updateFundDeducion(BankAccount bankAccount) {
        return null;
    }
    
}
