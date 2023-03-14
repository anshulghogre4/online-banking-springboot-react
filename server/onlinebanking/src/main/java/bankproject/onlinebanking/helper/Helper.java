package bankproject.onlinebanking.helper;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Helper {

    public static long generateAccountNo() {
    	long max = 80000000;
        long min = 40000000;
        long range = max - min + 1;
        long rand = (long)((Math.random() * range) + min);
		return rand;
    }

    public static String dateStamp() {      
  	  DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy");
  	  LocalDateTime now = LocalDateTime.now();
  	   String str =dtf.format(now);
      System.out.println(str);
      return str;
     }
    public static String timeStamp() {      
    	  DateTimeFormatter dtf = DateTimeFormatter.ofPattern("HH:mm:ss");
    	  LocalDateTime now = LocalDateTime.now();
    	   String str =dtf.format(now);
        System.out.println(str);
        return str;
    }
    
}
