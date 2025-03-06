package com.zinkki.shop.repository.order;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Integer> {

    //주문 items 생성
    @Modifying
    @Transactional
    @Query(value="insert into \n" +
            "Order_item(order_seq, product_seq, counts) \n" +
            "values(?1, ?2, ?3)", nativeQuery = true)
    void insertOrderItems(int order_seq, int product_seq, int counts);

    //유저별 주문 목록
    @Query(value = "select \n" +
            "u.user_seq userSeq, u.name userName,\n" +
            "o.order_seq orderSeq, o.o_date oDate, o.post_code postCode,\n" +
            "o.address address, o.address_detail addressDetail,\n" +
            "o.order_status oStatus,\n" +
            "oi.order_item_seq orderItemSeq, oi.counts counts,\n" +
            "p.product_seq productSeq, p.product_name productName, \n" +
            "p.price price, p.img img, p.stock stock \n" +
            "from `User` u \n" +
            "inner join Orders o \n" +
            "on u.user_seq = o.user_seq \n" +
            "inner join Order_item oi \n" +
            "on o.order_seq = oi.order_seq \n" +
            "inner join Product p \n" +
            "on oi.product_seq = p.product_seq \n" +
            "where u.user_seq = ?1 order by o.order_seq desc", nativeQuery = true)
    List<CustomOrderInterface> selectOrderList(int user_seq);

    //전체 주문 목록
    @Query(value = "select \n" +
            "u.user_seq userSeq, u.name userName,\n" +
            "o.order_seq orderSeq, o.o_date oDate, o.post_code postCode,\n" +
            "o.address address, o.address_detail addressDetail,\n" +
            "o.order_status oStatus,\n" +
            "oi.order_item_seq orderItemSeq, oi.counts counts,\n" +
            "p.product_seq productSeq, p.product_name productName, \n" +
            "p.price price, p.img img, p.stock stock \n" +
            "from `User` u \n" +
            "inner join Orders o \n" +
            "on u.user_seq = o.user_seq \n" +
            "inner join Order_item oi \n" +
            "on o.order_seq = oi.order_seq \n" +
            "inner join Product p \n" +
            "on oi.product_seq = p.product_seq \n" +
            "order by o.order_seq desc", nativeQuery = true)
    List<CustomOrderInterface> selectAllOrderList();

}
