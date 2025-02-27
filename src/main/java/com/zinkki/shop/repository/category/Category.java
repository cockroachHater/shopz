package com.zinkki.shop.repository.category;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int categorySeq;

    @Column
    public String category_title;
}
