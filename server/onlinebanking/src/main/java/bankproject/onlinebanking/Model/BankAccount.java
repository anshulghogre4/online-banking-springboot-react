package bankproject.onlinebanking.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Table(name = "bankaccount")
public class BankAccount {

    @Id
    private Long accountno;

    @Column
    private String accountType;

    @Column
    private String dateCreated;

    @Column
    private String timeCreated;
    @Column
    private Double balance;

    private boolean isactive;

    @ManyToOne
    @JsonBackReference(value = "user-account")
    private User user;

    // @OneToOne(mappedBy = "account")
    // @JsonManagedReference
    // private LoanAccount loanAccount;

}
