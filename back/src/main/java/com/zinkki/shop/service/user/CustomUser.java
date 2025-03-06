package com.zinkki.shop.service.user;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class CustomUser extends User {
    public int user_seq;
    public String name;
    public String email;
    public String user_role;
    public CustomUser(
            String email,
            String password,
            Collection<? extends GrantedAuthority> authorities) {
        super(email, password, authorities);
    }
}
