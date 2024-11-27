package com.zinkki.shop.repository.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int seq;

    @Column(unique = true)
    public String username;
    public String password;

}


