package bankproject.onlinebanking.Controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import bankproject.onlinebanking.Model.BankAccount;
import bankproject.onlinebanking.Model.Beneficiaries;
import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Repository.UserRepository;
import bankproject.onlinebanking.Service.AccountService;
import bankproject.onlinebanking.Service.BeneficiariesService;
import bankproject.onlinebanking.Service.SignUpService;

@RestController
@RequestMapping("/beneficiaries")
public class BeneficiaryController {

    @Autowired
    private BeneficiariesService beneficiariesService;

    @Autowired
    private SignUpService signUpService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/add")
    public ResponseEntity<Beneficiaries> createBeneficiary(@RequestBody Beneficiaries beneficiary) {
        Beneficiaries newBeneficiary = beneficiariesService.createBeneficiary(beneficiary);
        return new ResponseEntity<>(newBeneficiary, HttpStatus.CREATED);
    }

    @PostMapping("/create/{userId}")
    public ResponseEntity<?> saveBeneficiary(@RequestBody Beneficiaries beneficiary, @PathVariable String userId) {
        if (accountService.findByAccountNo(beneficiary.getBeneaccountno()) == null)
            return new ResponseEntity<>("Account does not Exists", HttpStatus.NOT_FOUND);

        List<BankAccount> account = accountService.findByUserId(userId);
        for (BankAccount bankAccount : account) {
            if (bankAccount.getAccountno() == beneficiary.getBeneaccountno())
                return new ResponseEntity<>("This account cannot be added", HttpStatus.OK);
        }

        List<Beneficiaries> beneficiaries = beneficiariesService.getBeneficiariesByUserId(userId);
        if (beneficiaries != null) {
            for (Beneficiaries ben : beneficiaries) {
                if (ben.getBeneaccountno() == beneficiary.getBeneaccountno())
                    return new ResponseEntity<String>("Already Exists", HttpStatus.OK);
            }
        }

        return new ResponseEntity<>(beneficiariesService.createBeneficiaries(beneficiary, userId), HttpStatus.OK);
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Beneficiaries>> getAllBeneficiaries() {
        List<Beneficiaries> beneficiaries = beneficiariesService.getAllBeneficiaries();
        return new ResponseEntity<>(beneficiaries, HttpStatus.OK);
    }

    @GetMapping("/getabn/{beneficiaryId}")
    public ResponseEntity<Beneficiaries> getBeneficiaryById(@PathVariable int beneficiaryId) {
        Beneficiaries beneficiary = beneficiariesService.getBeneficiaryById(beneficiaryId);
        return new ResponseEntity<>(beneficiary, HttpStatus.OK);
    }

    @PutMapping("/updateabn/{userId}")
    public ResponseEntity<?> updateBeneficiary(@RequestBody Beneficiaries beneficiary, @PathVariable String userId) {

        User theuser = userRepo.findById(userId).get();
        List<BankAccount> account = accountService.findByUserId(userId);
        for (BankAccount bankAccount : account) {
            if (bankAccount.getAccountno() == beneficiary.getBeneaccountno())
                return new ResponseEntity<>("This account cannot be added", HttpStatus.OK);
        }
        beneficiary.setUser(theuser);
        return new ResponseEntity<>(beneficiariesService.updateBeneficiary(beneficiary), HttpStatus.OK);
    }

    // redundant service
    // public ResponseEntity<Beneficiaries> updateBeneficiary(@RequestBody
    // Beneficiaries beneficiary) {
    // Beneficiaries updatedBeneficiary =
    // beneficiariesService.updateBeneficiary(beneficiary);
    // return new ResponseEntity<>(updatedBeneficiary, HttpStatus.OK);
    // }

    @DeleteMapping("/deleteabn/{beneficiaryId}")
    public ResponseEntity<Void> deleteBeneficiary(@PathVariable int beneficiaryId) {
        beneficiariesService.deleteBeneficiary(beneficiaryId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getBeneficiariesByUserId(@PathVariable String userId) {
        List<Beneficiaries> beneficiaries = beneficiariesService.getBeneficiariesByUserId(userId);
        return new ResponseEntity<>(beneficiaries, HttpStatus.OK);
    }
}
