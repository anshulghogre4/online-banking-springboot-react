package bankproject.onlinebanking.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import bankproject.onlinebanking.Model.BankAccount;
import bankproject.onlinebanking.Model.Transactions;
import bankproject.onlinebanking.Service.TransactionService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/transaction")
    public ResponseEntity<List<Transactions>> findAll()
    {
        if(transactionService.findAll()!=null)
        {
            List<Transactions> transactions= transactionService.findAll();
            return new ResponseEntity<>(transactions, HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/sender/{fromAccount}")
    public ResponseEntity<List<Transactions>> findByFromAccount(@PathVariable long fromAccount)
    {
        if(transactionService.getDetailsByAccount(fromAccount)!=null)
        {
            List<Transactions> transactions= transactionService.getDetailsByAccount(fromAccount);
            return new ResponseEntity<>(transactions, HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/receiver/{toAccount}")
    public ResponseEntity<List<Transactions>> findByToAccount(@PathVariable long toAccount)
    {
        if(transactionService.getTransactionsByReceiver(toAccount)!=null)
        {
            List<Transactions> transactions= transactionService.getTransactionsByReceiver(toAccount);
            return new ResponseEntity<>(transactions, HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/bankaccount/{accountno}")
    public ResponseEntity<List<Transactions>> findByFromAccountNo(@PathVariable long accountno)
    {
        if(transactionService.getAllByAccount(accountno)!=null)
        {
            List<Transactions> transactions= transactionService.getAllByAccount(accountno);
            return new ResponseEntity<>(transactions, HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/transactionId/{transactionId}")
    public ResponseEntity<Transactions> findByToAccount(@PathVariable int transactionId)
    {
        if(transactionService.getTransactionsById(transactionId)!=null)
        {
            Transactions transactions= transactionService.getTransactionsById(transactionId);
            return new ResponseEntity<>(transactions, HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
