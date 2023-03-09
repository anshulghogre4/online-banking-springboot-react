package bankproject.onlinebanking.Service.ServiceImpl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import bankproject.onlinebanking.Service.MailService;

@Service
public class MailServiceImpl implements MailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void send(String from, String to, String subject, String body, Date theDate) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setSentDate(theDate);
        message.setReplyTo(from);
        String context = "From: " + from + "\n\n" + body + "\n\nSent Date: " + theDate;
        message.setText(context);
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
