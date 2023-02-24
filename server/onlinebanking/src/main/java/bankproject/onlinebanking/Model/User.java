package bankproject.onlinebanking.Model;

import java.sql.Date;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Table(name = "userdata")
public class User implements UserDetails {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "userid", strategy = "uuid2")
    private UUID userid;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "email", unique = true)
    private String email;
    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    public Role role;

    @Column(name = "accountreq")
    private boolean accountopenningreq;

    private boolean locked;
    private boolean enabled;

    @Column(name = "createdate")
    private Date createdDate;

    @Column(name = "resetPasswordToken")
    private String resetPasswordToken;

    // @Column
    // private boolean emailVerified;

    @Column(name = "otp")
    public String otp;

    @Transient
    public String token;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserDetail userdetails;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "user-account")
    private List<BankAccount> accounts;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Beneficiaries> beneficiaries;

    public User(String firstname, String lastname, String username, String email, String password, Role role,
            boolean accountopenningreq, boolean locked, boolean enabled, Date createdDate, UserDetail userdetails) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.accountopenningreq = accountopenningreq;
        this.locked = locked;
        this.enabled = enabled;
        this.createdDate = createdDate;
        this.userdetails = userdetails;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.name());

        return Collections.singleton(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    // public boolean isEmailVerified() {
    // return emailVerified;
    // }

    // public void setEmailverified(boolean emailVerified) {
    // this.emailVerified = emailVerified;
    // }

    // @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    // @JsonManagedReference(value = "user-loan")
    // private List<LoanAccount> loanAccounts;

    // user active we can add in in future

}
