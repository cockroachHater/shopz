package com.zinkki.shop.repository.product;

import com.zinkki.shop.repository.category.Category;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Getter
@Setter
@DynamicUpdate
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
