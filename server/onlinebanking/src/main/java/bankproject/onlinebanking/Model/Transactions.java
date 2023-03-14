package bankproject.onlinebanking.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "transactions")
public class Transactions {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int transactionId;

    @Column
    private long fromAccount;

    @Column 
    private double senderBal;

    @Column
    private long toAccount;

    @Column 
    private double receiverBal;

    @Column
    private Double amount;

    @Column
    private String transactionStatus;

    @Column
    private String transactionDate;

    @Column
    private String transactionTime;

    @Column
    private String description;

}
