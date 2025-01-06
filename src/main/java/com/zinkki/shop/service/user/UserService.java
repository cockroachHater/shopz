package com.zinkki.shop.service.user;

import com.zinkki.shop.repository.user.User;
import com.zinkki.shop.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        var result = userRepository.findByEmail(email);
        if(result.isEmpty()) {
            throw new UsernameNotFoundException("No user found with id!");
        }
        var user = result.get();
        List<GrantedAuthority> grant = new ArrayList<>();
        grant.add(new SimpleGrantedAuthority("user"));
        var a = new CustomUser(user.getEmail(), user.getPassword(), grant);
        a.user_seq = user.getUser_seq();
        a.name = user.getName();
        a.email = user.getEmail();
        a.user_role = user.getUser_role();
        return a;
    }

    public String idCheck(String email) {
        try {
            Optional<User> user = userRepository.findByEmail(email);
            if(user.isPresent()) {
                //email 중복O
                return "exists";
            }else {
                //email 중복X && 유효성검사
                String Email_Regex=
                        "^[a-zA-Z0-9_+&*-]+(?:\\." +
                                "[a-zA-Z0-9_+&*-]+)*@" +
                                "(?:[a-zA-Z0-9-]+\\.)+[a-z" +
                                "A-Z]{2,7}$";
                Pattern pattern = Pattern.compile(Email_Regex);
                Matcher matcher = pattern.matcher(email);
                if(matcher.matches() == false) {
                    System.out.println("It's not an email format!");
                    return "wrongEmail";
                }
                if(email == null || email.equals("") || email.trim().isEmpty() == true ) {
                    System.out.println("email is empty!");
                    return "nullError";
                } else {
                    return "ok";
                }
            }
        }catch (Exception e) {
            return e.getMessage();
        }
    }
}

