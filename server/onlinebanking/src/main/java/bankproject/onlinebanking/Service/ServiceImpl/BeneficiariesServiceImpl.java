package bankproject.onlinebanking.Service.ServiceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bankproject.onlinebanking.Model.Beneficiaries;
import bankproject.onlinebanking.Model.User;
import bankproject.onlinebanking.Repository.BeneficiaryRepository;
import bankproject.onlinebanking.Repository.UserRepository;
import bankproject.onlinebanking.Service.BeneficiariesService;

@Service
public class BeneficiariesServiceImpl implements BeneficiariesService {

    @Autowired
    private BeneficiaryRepository beneficiariesRepository;

    @Autowired
    private UserRepository userRepo;

    @Override
    public Beneficiaries createBeneficiary(Beneficiaries beneficiary) {
        return beneficiariesRepository.save(beneficiary);
    }

    @Override
    public Beneficiaries getBeneficiaryById(int beneficiaryId) {
        Beneficiaries beneficiaryOptional = beneficiariesRepository.findById(beneficiaryId).get();
        return (beneficiaryOptional);
    }

    @Override
    public List<Beneficiaries> getAllBeneficiaries() {
        return beneficiariesRepository.findAll();
    }

    @Override
    public Beneficiaries updateBeneficiary(Beneficiaries beneficiary) {
        return beneficiariesRepository.save(beneficiary);
    }

    @Override
    public void deleteBeneficiary(int beneficiaryId) {
        beneficiariesRepository.deleteById(beneficiaryId);
    }

    @Override
    public List<Beneficiaries> getBeneficiariesByUserId(String userId) {
        return beneficiariesRepository.findAllByUserId(userId);
    }

    @Override
    public List<Beneficiaries> createBeneficiaries(Beneficiaries beneficiary, String userId) {
        User theUser = userRepo.findById(userId).get();
        List<Beneficiaries> beneficiaries = beneficiariesRepository.findAllByUserId(userId);

        beneficiaries.add(beneficiary);
        // beneficiary.setUser(theUser);
        theUser.setBeneficiaries(beneficiaries);

        User savingUpdatedUser = userRepo.save(theUser);

        return savingUpdatedUser.getBeneficiaries();

    }

}
