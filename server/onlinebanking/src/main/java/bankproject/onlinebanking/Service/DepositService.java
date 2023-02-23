package bankproject.onlinebanking.Service;

public interface DepositService {
    public void saveDeposit(long accounNo, double balance);
    public void updateFundDeposit(long accounNo, double balance);
}
