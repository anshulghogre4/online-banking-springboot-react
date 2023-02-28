package bankproject.onlinebanking.Model;

import java.math.BigInteger;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.ManyToAny;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "beneficiaries")
public class Beneficiaries {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int beneficiaryid;

    private String beneficiaryname;

    private long beneaccountno;

    private String relation;
    
    @ManyToOne
    @JsonBackReference(value = "user-beneficiaries")
    private User user;
    //@JsonBackReference(value = "user-beneficiaries")
}
