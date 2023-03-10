package bankproject.onlinebanking.Model;

import java.math.BigInteger;
import java.sql.Blob;
import java.sql.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnTransformer;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "userdetails")
public class UserDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userdetailsid;

    private Blob image;
    private String address;
    private String city;
    private String pin;
    private String state;

    private String adhaar;

    private String mobile;

    // @ColumnTransformer(read = "UPPER(name)", write = "LOWER(?)")
    private String pan;

    private char gender;

    @Column(name = "birthdate")
    public Date dateOfBirth;

    @OneToOne
    @JsonBackReference
    private User user;

    private int age;
}
