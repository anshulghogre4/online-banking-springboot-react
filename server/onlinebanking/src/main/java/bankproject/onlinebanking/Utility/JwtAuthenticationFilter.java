package bankproject.onlinebanking.Utility;

import java.io.IOException;

import javax.management.monitor.GaugeMonitor;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    private Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String reqToken = request.getHeader("Authorization");

        logger.info("header: {}", reqToken);

        String username = null;
        String token = null;

        if (reqToken != null && reqToken.startsWith("Bearer")) {

            token = reqToken.substring(7);

            try {

                username = jwtUtil.getUsernameFromToken(token);

            } catch (IllegalArgumentException e) {

                logger.info("Illegal argument while fetching th argument!");
                e.printStackTrace();

            } catch (ExpiredJwtException e) {

                logger.info("Given JWT is expired !");
                e.printStackTrace();
            } catch (MalformedJwtException e) {

                logger.info("Something is malfunctioned in JWT! Invalid Token!");
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }

        } else {
            logger.info("invalid header value!");
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            Boolean validatedToken = jwtUtil.validateToken(token, userDetails);

            if (validatedToken) {

                // setiing the authentication
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails, null,
                        userDetails.getAuthorities());

                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(auth);
            } else {
                logger.info("Validation failed!");
            }

        }

        filterChain.doFilter(request, response);

    }

}
