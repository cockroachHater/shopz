package com.zinkki.shop.repository.cart;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Cart {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    public int cart_seq;

    @Column
    public int user_seq;
    public int product_seq;
    public int counts;

}
