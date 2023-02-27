package bankproject.onlinebanking.Service;

import java.util.List;
import java.util.Optional;

import bankproject.onlinebanking.Model.Beneficiaries;

public interface BeneficiariesService {

    Beneficiaries createBeneficiary(Beneficiaries beneficiary);

    public Beneficiaries getBeneficiaryById(int beneficiaryId);

    List<Beneficiaries> getAllBeneficiaries();

    Beneficiaries updateBeneficiary(Beneficiaries beneficiary);

    void deleteBeneficiary(int beneficiaryId);
    
    Optional<Beneficiaries> getBeneficiariesByUserId(int userId);
}
