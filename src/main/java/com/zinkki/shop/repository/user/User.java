package com.zinkki.shop.repository.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
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
    public String email;
    public String name;
    public String password;
    public String address;
    public String phone;
}


