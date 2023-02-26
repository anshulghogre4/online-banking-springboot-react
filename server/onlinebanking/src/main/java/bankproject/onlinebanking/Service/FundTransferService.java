package bankproject.onlinebanking.Service;

import bankproject.onlinebanking.Model.BankAccount;
import bankproject.onlinebanking.Model.Transactions;

public interface FundTransferService {
   //public Transactions fundTransfer(long accounNo,String name, String desctription, double amount );
    public Transactions save(Transactions transactions);
    public BankAccount updateFundDeducion(BankAccount bankAccount);

}
