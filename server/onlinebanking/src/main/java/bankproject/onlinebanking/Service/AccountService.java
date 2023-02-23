package bankproject.onlinebanking.Service;


import java.util.List;

import bankproject.onlinebanking.Model.BankAccount;

public interface AccountService {

    public BankAccount findByAccountNo(long accountNo);
    List<BankAccount> findAll();
    public BankAccount saveAccount(BankAccount bankAccount);
    public void updateAccount(BankAccount bankAccount);
    public void deleteAccount(BankAccount bankAccount);
}
