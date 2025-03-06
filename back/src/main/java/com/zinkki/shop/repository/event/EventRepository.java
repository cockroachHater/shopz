package com.zinkki.shop.repository.event;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EventRepository extends CrudRepository<Events, Integer> {

    //이벤트 리스트
    List<Events> findAll();

}
