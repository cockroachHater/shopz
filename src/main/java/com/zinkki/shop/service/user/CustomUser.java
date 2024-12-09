package com.zinkki.shop.service.user;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class CustomUser extends User {
    public int seq;
    public String name;
    public CustomUser(
            String email,
            String password,
            Collection<? extends GrantedAuthority> authorities) {
        super(email, password, authorities);
    }
}
