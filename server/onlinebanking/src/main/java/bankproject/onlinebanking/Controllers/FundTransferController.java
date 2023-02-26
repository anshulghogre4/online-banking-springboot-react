package bankproject.onlinebanking.Controllers;

import org.apache.catalina.startup.HostRuleSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bankproject.helper.Helper;
import bankproject.onlinebanking.Model.BankAccount;
import bankproject.onlinebanking.Model.Transactions;
import bankproject.onlinebanking.Service.AccountService;
import bankproject.onlinebanking.Service.FundTransferService;
import bankproject.onlinebanking.Service.TransactionService;

@RestController
@RequestMapping(path="/fund")
public class FundTransferController {

    @Autowired
    public FundTransferService fundTransferService;

    @Autowired
    public TransactionService transactionService;

    @Autowired 
    public AccountService accountService;


    @PostMapping("/transfer")
    public ResponseEntity<Transactions> fundTransfer(@RequestBody BankAccount bankAccount, @Param(value = "") long toAccount, @Param(value = "") double amount, @Param(value = "") String description)
    {
        if(accountService.findByAccountNo(bankAccount.getAccountno())!=null)
        {
            BankAccount senderAccount = accountService.findByAccountNo(bankAccount.getAccountno());
            if(!senderAccount.isIsactive())
            {
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }

            if(senderAccount.getBalance()< amount)
            {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
            else
            {
                BankAccount receiverAccount = accountService.findByAccountNo(toAccount);
                if(receiverAccount.getAccountno()==toAccount)
                {
                    senderAccount.setBalance(senderAccount.getBalance()-amount);
                    receiverAccount.setBalance(receiverAccount.getBalance()+amount);

                    Transactions newTransactions = new Transactions();
                    newTransactions.setFromAccount(senderAccount.getAccountno());
                    newTransactions.setToAccount(receiverAccount.getAccountno());
                    newTransactions.setAmount(amount);
                    newTransactions.setDescription(description);
                    newTransactions.setTransactionDate(Helper.dateStamp());
                    newTransactions.setTransactionTime(Helper.timeStamp());
                    newTransactions.setTransactionStatus("Completed");

                    accountService.updateAccount(senderAccount);
                    accountService.updateAccount(receiverAccount);
                    transactionService.save(newTransactions);
                    return new ResponseEntity<>(transactionService.getCurrentTransaction(senderAccount.getAccountno()), HttpStatus.OK);
                }

            }


        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    
}
