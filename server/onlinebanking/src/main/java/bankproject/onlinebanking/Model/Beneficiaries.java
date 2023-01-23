package bankproject.onlinebanking.Model;

import java.math.BigInteger;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.ManyToAny;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "beneficiaries")
public class Beneficiaries {

    @Id
    private int beneficiaryid;

    private String beneficiaryname;
    private BigInteger beneaccountno;
    private String relation;

    @ManyToOne
    private User user;

}
