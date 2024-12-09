package com.zinkki.shop.controllor.user;

import com.zinkki.shop.repository.user.User;
import com.zinkki.shop.repository.user.UserRepository;
import com.zinkki.shop.service.user.JwtUtil;
import com.zinkki.shop.service.user.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserService userService;

    @Value("${jwt.secret.key}")
    private String secretKey;

    @PostMapping("/api/login")
    @ResponseBody
      String login(@RequestParam String email, @RequestParam String password,
                   HttpServletResponse response) {
        var authToken = new UsernamePasswordAuthenticationToken(email, password);
        var auth = authenticationManagerBuilder.getObject().authenticate(authToken);
        if(auth != null) {
            System.out.println("안비었어~~~");
            SecurityContextHolder.getContext().setAuthentication(auth);
            System.out.println("드디어 컨트롤러에서ㅠㅠ auth : " + auth);
            System.out.println("드디어 컨트롤러에서ㅠㅠ auth : " + auth.getName());
            System.out.println("드디어 컨트롤러에서ㅠㅠ auth : " + auth.isAuthenticated());

            var jwt = JwtUtil.createToken(SecurityContextHolder.getContext().getAuthentication(),secretKey);
            System.out.println(jwt);

            var cookie = new Cookie("jwt", jwt);
            cookie.setMaxAge(60); // 10=10초
            cookie.setHttpOnly(true); //true => 자바스크립트로 쿠키조작 어려워짐;
            cookie.setPath("/"); //모든경로에서 쿠키전송
            response.addCookie(cookie);

            return auth.getName();
        }
        else {
            System.out.println("auth비었다!!!!!");
            return "failed";
        }
    }

    @GetMapping("/api/mypage")
    @ResponseBody
    public String myPage() {
        System.out.println("api-------mypage");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        if(email.equals("anonymousUser")) {
            System.out.println("api-------mypage----auth is null");
            return "null";
        }
        else {
            System.out.println(auth.getName());
            Optional<User> user = userRepository.findByEmail(auth.getName());
            System.out.println("api-------mypage----end");
            return user.get().getEmail();
        }
    }

    @PostMapping("/api/idCheck")
    @ResponseBody
    String idCheck(@RequestParam String email) {
        String result = userService.idCheck(email);
        return result;
    }

    @PostMapping("/api/test")
    @ResponseBody
    String test(@RequestParam String address, String name, String phone) {
        System.out.println(address);
        System.out.println(name);
        System.out.println(phone);
        return "ok";
    }

    @PostMapping("/api/join")
    @ResponseBody
    String join(@RequestParam String email, @RequestParam String password) {
        try {
            if(email == null || password == null ||
                    email.equals("") || password.equals("") ||
                    email.trim().isEmpty() == true || 
                    password.trim().isEmpty() == true) { // id,pw비었을때
                System.out.println("email or password is null"); 
                return "nullError";
            }
            if(email.length() < 6 || password.length() < 6) { // id,pw 6자이하
                System.out.println("email length is less than 6"); 
                return "shortError";
            }
            if(email.length() > 29 || password.length() > 29) { // id,pw 30자이상
                System.out.println("email and password is no more than 30 characters!");
                return "longError";
            }
            else {
                var hash = bCryptPasswordEncoder.encode(password);
                User user = new User();
                user.setEmail(email);
                user.setPassword(hash);
                userRepository.save(user);
                System.out.println(email);
                System.out.println(password);
                return "ok";
            }
        } catch (Exception e) {
            return "error!";
        }
    }


}
