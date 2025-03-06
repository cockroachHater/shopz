package com.zinkki.shop.controllor.user;

import com.zinkki.shop.repository.user.User;
import com.zinkki.shop.repository.user.UserRepository;
import com.zinkki.shop.service.user.CustomUser;
import com.zinkki.shop.service.user.JwtUtil;
import com.zinkki.shop.service.user.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserService userService;

    @Value("${jwt.secret.key}")
    private String secretKey;

    //회원가입시 id 중복체크
    @PostMapping("/api/idCheck")
    @ResponseBody
    String idCheck(@RequestParam String email) {
        String result = userService.idCheck(email);
        return result;
    }
    
    //회원가입
    @PostMapping("/api/join")
    @ResponseBody
    String join(@RequestParam String email, @RequestParam String password, @RequestParam String name, @RequestParam String phone) {
        try {
            //password encoder
            var hash = bCryptPasswordEncoder.encode(password);
            //insert
            User user = new User();
            user.setEmail(email);
            user.setPassword(hash);
            user.setName(name);
            user.setPhone(phone);
            userRepository.save(user);
            return "ok";
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return "error";
        }
    }

    //로그인
    @PostMapping("/api/login")
    @ResponseBody
      CustomUser login(@RequestParam String email, @RequestParam String password,
                   HttpServletResponse response) {
        var authToken = new UsernamePasswordAuthenticationToken(email, password);
        var auth = authenticationManagerBuilder.getObject().authenticate(authToken);
        if(auth != null) {
            SecurityContextHolder.getContext().setAuthentication(auth);
            var jwt = JwtUtil.createToken(SecurityContextHolder.getContext().getAuthentication(),secretKey);
            var user = (CustomUser) userService.loadUserByUsername(auth.getName());
            var cookie = new Cookie("jwt", jwt);
            cookie.setMaxAge(60); // 10=10초
            cookie.setHttpOnly(true); //true => 자바스크립트로 쿠키조작 어려워짐;
            cookie.setPath("/"); //모든경로에서 쿠키전송
            response.addCookie(cookie);
            return user;
        }
        else {
            System.out.println("None-auth");
            return null;
        }
    }

    //유저리스트
    @GetMapping("/api/allUserList")
    @ResponseBody
    List<User> allUserList() {
        List<User> user = userRepository.findAll();
        return user;
    }
}
