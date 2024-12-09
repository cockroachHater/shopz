package com.zinkki.shop.service.user;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Arrays;

@org.springframework.stereotype.Component
public class JwtFilter extends OncePerRequestFilter {

    @Value("${jwt.secret.key}")
    private String secretKey;

    @Override
    protected void doFilterInternal(
            @NotNull HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        System.out.println("--------JWT Filter-------실행");
        System.out.println(secretKey);

        Cookie[] cookies = request.getCookies();

        //쿠키 없으면 실행 멈추기
        if(cookies == null) {
            System.out.println("쿠키X XX필터실행XX");
            filterChain.doFilter(request, response);
            return;
        }
        System.out.println("쿠키O OO필터실행OO");
        //쿠키 Name이 항상 jwt만 있는게 아님, Name이 jwt인거만 가져오기
        var jwtCookie = "";
        for(int i=0;i<cookies.length;i++){
            if(cookies[i].getName().equals("jwt")){
                jwtCookie = cookies[i].getValue();
            }
        }
        System.out.println("filter안의 jwtcookie! : " + jwtCookie);

        //이상없을때 -> 정보 뽑아서 principal에 넣기
        Claims claim;
        try {
            claim = JwtUtil.extractToken(jwtCookie,secretKey);
            System.out.println("No problem~!");
        } catch (Exception e) {
            System.out.println("문제있는데...????이래서 밑에 Authentication 안나왔음");
            System.out.println(e.getMessage());
            filterChain.doFilter(request, response);
            return;
        }

        var arr = claim.get("authorities").toString().split(",");
        var authorities = Arrays.stream(arr).map(a ->new SimpleGrantedAuthority(a)).toList();

        var customUser = new CustomUser(
                claim.get("email").toString(),
                "secret",
                authorities
        );

        customUser.name = claim.get("email").toString();
        System.out.println("filter -> customuser displayname~" + customUser.name);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Filter! =>" + authentication);
        System.out.println("Filter! =>" +authentication.getName());
        System.out.println("Filter! =>" +authentication.isAuthenticated());

        var authToken = new UsernamePasswordAuthenticationToken(claim.get("email").toString(), "");
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authToken);

        System.out.println("필터끝!");
        filterChain.doFilter(request, response);
    }
}
