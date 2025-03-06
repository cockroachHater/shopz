package com.zinkki.shop.repository.order;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Order_item {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    public int order_item_seq;

    @Column
    public int order_seq;
    public int product_seq;
    public int counts;
}
