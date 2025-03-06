package com.zinkki.shop.repository.faq;


import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FaqRepository extends CrudRepository<Faq, Integer> {
    //Faq리스트
    List<Faq> findAll();
}
