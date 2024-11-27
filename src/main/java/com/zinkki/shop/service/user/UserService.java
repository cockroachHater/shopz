package com.zinkki.shop.service.user;

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

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Service---------------1");
        var result = userRepository.findByUsername(username);
        if(result.isEmpty()) {
            System.out.println("No user found with id!------------");
            throw new UsernameNotFoundException("No user found with id!");
        }
        var user = result.get();
        List<GrantedAuthority> grant = new ArrayList<>();
        grant.add(new SimpleGrantedAuthority("user"));
        System.out.println("Service---------------2");
        var a = new CustomUser(user.getUsername(), user.getPassword(), grant);
        a.seq = user.getSeq();
        return a;
    }
}

