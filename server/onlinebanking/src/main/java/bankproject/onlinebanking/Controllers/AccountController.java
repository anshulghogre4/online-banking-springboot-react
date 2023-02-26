package bankproject.onlinebanking.Controllers;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import javax.transaction.Transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bankproject.helper.Helper;
import bankproject.onlinebanking.Model.BankAccount;
import bankproject.onlinebanking.Model.Transactions;
import bankproject.onlinebanking.Service.AccountService;
import bankproject.onlinebanking.Service.TransactionService;
import lombok.AllArgsConstructor;


//
//@AllArgsConstructor
@RestController
@RequestMapping(path = "/account")
public class AccountController {


    @Autowired
    public AccountService accountService;

    @Autowired
    public TransactionService transactionService;

    @GetMapping("/accountdetails/{accountNo}")
    public BankAccount findAccount(@PathVariable long accountNo)
    {
        System.out.println("Acc Details");
        return accountService.findByAccountNo(accountNo);
    }

    @GetMapping("/accounts")
    public List<BankAccount> findAllAccounts()
    {
         return accountService.findAll();
    }

    @PostMapping("/create")
    public BankAccount saveAccount(@RequestBody BankAccount bankAccount)
    {
        System.out.println("Ctreations");
        BankAccount newAccount = new BankAccount();
        newAccount.setAccountType(bankAccount.getAccountType());
        newAccount.setBalance(0.00);
        newAccount.setIsactive(true);
        //newAccount.setUser(bankAccount.getUser());
        long accountno;
        do{
            accountno = Helper.generateAccountNo();
            }while(!accountService.validateAccNo(accountno));
        newAccount.setAccountno(accountno);
        newAccount.setDateCreated(Helper.dateStamp());
        newAccount.setTimeCreated(Helper.timeStamp());
        return accountService.saveAccount(newAccount);
    }

    @DeleteMapping("/accounts/{accountno}")
    private ResponseEntity<BankAccount> deleteAccount(@PathVariable long accountno)
    {
        if(accountService.findByAccountNo(accountno)!=null)
            return new ResponseEntity<BankAccount>(accountService.deleteAccount((long)accountno), HttpStatus.OK);
        else
            return new ResponseEntity<BankAccount>(new BankAccount(), HttpStatus.CONFLICT);
    }

    @GetMapping("/accounts/suspend/{accountno}")
    private ResponseEntity suspendAccount(@PathVariable long accountno)
    {
        BankAccount account= accountService.findByAccountNo(accountno);
        if( account != null)
        {    
            account.setIsactive(false);
            accountService.updateAccount(account);
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/accounts/activate/{accountno}")
    private ResponseEntity activateAccount(@PathVariable long accountno)
    {
        BankAccount account= accountService.findByAccountNo(accountno);
        if( account != null)
        {    
            account.setIsactive(true);
            accountService.updateAccount(account);
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/accounts/fixdeposit")
    private ResponseEntity<BankAccount> fixedDeposit(@RequestBody BankAccount bankAccount)
    {
        BankAccount account = accountService.findByAccountNo(bankAccount.getAccountno());
        if( account != null)
        {
            double newbalance = bankAccount.getBalance();
            if(account.getBalance()>0)
            {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
            else{
               account.setBalance(newbalance); 
            }
            accountService.updateAccount(account);
            Transactions firstTransaction = new Transactions();
            firstTransaction.setFromAccount(99999999);
            firstTransaction.setToAccount(account.getAccountno());
            firstTransaction.setAmount(account.getBalance());
            firstTransaction.setDescription("Fixed Deposit");
            firstTransaction.setTransactionStatus("Completed");
            firstTransaction.setTransactionDate(Helper.dateStamp());
            firstTransaction.setTransactionTime(Helper.timeStamp());
            transactionService.save(firstTransaction);

            return new ResponseEntity<BankAccount>(accountService.findByAccountNo(bankAccount.getAccountno()), HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
 
}
