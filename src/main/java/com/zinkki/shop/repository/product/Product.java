package com.zinkki.shop.repository.product;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int product_seq;

    @Column
    public int category_seq;
    public String product_name;
    public int price;
    public String img;
    public String product_detail;
    public int stock;
    public int product_status;
}
