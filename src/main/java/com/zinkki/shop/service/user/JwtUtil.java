package com.zinkki.shop.service.user;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;


@Component
public class JwtUtil {

    // Create JWT
    public static String createToken(Authentication auth, @Value("${jwt.secret.key}")String secretKey) {
        System.out.println("create Token!!! 1 : ");
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
        var user = (CustomUser) auth.getPrincipal();
        var authorities = auth.getAuthorities().stream().map(a -> a.getAuthority())
                .collect(Collectors.joining(","));
        String jwt = Jwts.builder()
                .claim("email", user.getUsername())
                .claim("authorities", authorities)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 60000)) //10000일때 = 유효기간 10초
                .signWith(key)
                .compact();
        System.out.println("create Token!!! 2 : ");
        return jwt;
    }

    // Open JWT
    public static Claims extractToken(String token, @Value("${jwt.secret.key}")String secretKey) {
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
        Claims claims = Jwts.parser().verifyWith(key).build()
                .parseSignedClaims(token).getPayload();
        return claims;
    }

}
