package bankproject.onlinebanking.Service;

import java.math.BigInteger;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bankproject.onlinebanking.Model.BankAccount;
import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Repository.BankAccountRepository;

@Service
public class AccountServiceImpl implements AccountService{
    
    @Autowired
    private BankAccountRepository bankAccountRepository;


    @Override
    public BankAccount findByAccountNo(long accountNo) {
       return bankAccountRepository.findByAccountNo(accountNo);
    }

    @Override
    public List<BankAccount> findAll() {
        return bankAccountRepository.findAll();
    }

    @Override
    public BankAccount saveAccount(BankAccount bankAccount) {
        return bankAccountRepository.save(bankAccount);
    }

    @Override
    public void updateAccount(BankAccount bankAccount) {

        BankAccount account = bankAccountRepository.findByAccountNo(bankAccount.getAccountno());
        account.setUser(bankAccount.getUser());
        bankAccountRepository.save(account);// **need to add query**
    }

    @Override
    public void deleteAccount(BankAccount bankAccount) {
       bankAccountRepository.deleteById(bankAccount.getAccountno());
    }



}
