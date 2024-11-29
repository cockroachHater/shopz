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
      String login(@RequestParam String username, @RequestParam String password,
                   HttpServletResponse response) {
        var authToken = new UsernamePasswordAuthenticationToken(username, password);
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

            return jwt;
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
        String username = auth.getName();
        if(username.equals("anonymousUser")) {
            System.out.println("api-------mypage----auth is null");
            return "null";
        }
        else {
            System.out.println(auth.getName());
            Optional<User> user = userRepository.findByUsername(auth.getName());
            System.out.println("api-------mypage----end");
            return user.get().getUsername();
        }
    }

    @PostMapping("/api/join")
    @ResponseBody
    String join(@RequestParam String username, @RequestParam String password) {
        try {
            if(username == null || password == null ||
                    username.equals("") || password.equals("") ||
                    username.trim().isEmpty() == true || password.trim().isEmpty() == true) {
                System.out.println("id or password is null");
                throw new Exception();
            }
            if(username.length() < 6 || password.length() < 6) {
                System.out.println("id length is less than 6");
                throw new Exception();
            }
            else {
                var hash = bCryptPasswordEncoder.encode(password);
                User user = new User();
                user.setUsername(username);
                user.setPassword(hash);
                userRepository.save(user);
                System.out.println(username);
                System.out.println(password);
                return "ok";
            }
        } catch (Exception e) {
            return "error!";
        }
    }


}
