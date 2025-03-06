package com.zinkki.shop.repository.faq;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Faq {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    public int faq_seq;

    @Column
    public int user_seq;
    public String faq_title;
    public String faq_contents;
}
