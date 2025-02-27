package com.zinkki.shop.repository.order;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Orders {

    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    public int order_seq;

    @Column
    public int user_seq;
    public String post_code;
    public String address;
    public String address_detail;

}
