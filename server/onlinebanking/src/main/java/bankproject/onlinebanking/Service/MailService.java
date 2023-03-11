package bankproject.onlinebanking.Service;

import java.util.Date;

import bankproject.onlinebanking.Model.Mail;

public interface MailService {
    public void send(Mail theMail);

    public void transactionMail(String to, String subject, String body);

    public void sendMail(String email, String link);
}
