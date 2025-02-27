package com.zinkki.shop.service.order;

import com.zinkki.shop.repository.order.OrderRepository;
import com.zinkki.shop.repository.order.Orders;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;

    //주문 테이블에 column 저장 & PK 받아오기
    public int orderInsertAndGetSelectKey(int user_seq, String post_code, String address, String address_detail) {
        try {
            Orders orders = new Orders();
            orders.setUser_seq(user_seq);
            orders.setPost_code(post_code);
            orders.setAddress(address);
            orders.setAddress_detail(address_detail);
            orderRepository.save(orders);
            return orders.getOrder_seq(); //selectKey 리턴
        }catch(Exception e) {
            System.out.println(e.getMessage());
            return -100;
        }
    }
}
