package bankproject.onlinebanking.Service.ServiceImpl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import bankproject.onlinebanking.Model.Mail;
import bankproject.onlinebanking.Service.MailService;

@Service
public class MailServiceImpl implements MailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void send(Mail theMail) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo("dummybankprojectemail@gmail.com");
        message.setSubject(theMail.subject);
        message.setText(theMail.body + "\n\nFrom: " + theMail.email + "\n\nSent Date: " + theMail.sentDate);
        javaMailSender.send(message);
    }

    @Override
    public void transactionMail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        javaMailSender.send(message);
    }

    @Override
    public void sendMail(String email, String link) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setText(link);
        message.setSubject("Reset Password");
        javaMailSender.send(message);

    }

}
