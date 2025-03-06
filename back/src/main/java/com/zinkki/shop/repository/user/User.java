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
    public int user_seq;

    @Column(unique = true)
    public String email;

    public String name;
    public String password;
    public String address;
    public String phone;
    public String user_role;
}


