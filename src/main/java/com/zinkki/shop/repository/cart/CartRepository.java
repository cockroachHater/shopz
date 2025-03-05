package com.zinkki.shop.repository.cart;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends CrudRepository<Cart, Integer> {

    //카트리스트
    @Query(value="select u.user_seq userSeq, u.name userName, \n" +
            "p.product_seq productSeq, p.product_name productName, \n" +
            "p.stock stock, p.price price, p.img img, \n" +
            "c.cart_seq cartSeq, \n" +
            "if(c.counts >= p.stock, p.stock, c.counts) as productCounts \n" +
            "from user u \n" +
            "inner join cart c \n" +
            "on u.user_seq = c.user_seq  \n" +
            "inner join product p \n" +
            "on c.product_seq = p.product_seq \n" +
            "where c.user_seq =?1 group by userSeq, productSeq \n" +
            "order by c.cart_seq desc", nativeQuery = true)
    List<CustomCartInterface> selectCartByUserAndProduct(int user_seq);

    //담겨있는 상품인지 체크
    @Query(value="select c.cart_seq cartSeq,\n" +
            "u.user_seq userSeq, \n" +
            "p.product_seq productSeq, \n" +
            "p.product_name productName, \n" +
            "p.price price, p.img img,\n" +
            "c.counts productCounts \n" +
            "from user u \n" +
            "inner join cart c\n" +
            "on u.user_seq = c.user_seq  \n" +
            "inner join product p \n" +
            "on c.product_seq = p.product_seq\n" +
            "where c.user_seq =?1 and c.product_seq =?2", nativeQuery = true)
    Optional<CartInterface> selectCartByDupl(int user_seq, int product_seq);

    //기존상품이 담겨있을 때 갯수 추가
    @Modifying
    @Transactional
    @Query(value = "update cart set counts=counts+?1 \n"
            + "where user_seq=?2 and product_seq=?3", nativeQuery = true)
    void countsAddCart(int counts, int user_seq, int product_seq);

    //카트 상세 보기
    @Query(value = "select u.user_seq userSeq, u.name userName,\n" +
            "p.product_seq productSeq, p.product_name productName, \n" +
            "p.stock stock, p.price price, p.img img,\n" +
            "c.cart_seq cartSeq," +
            "if(c.counts >= p.stock, p.stock, c.counts) as productCounts \n" +
            "from `user` u\n" +
            "inner join cart c \n" +
            "on u.user_seq = c.user_seq\n" +
            "inner join product p \n" +
            "on c.product_seq = p.product_seq\n" +
            "where c.cart_seq =?1", nativeQuery = true)
    List<CustomCartInterface> selectCartByCart(int cart_seq);

    //상품 갯수 수정
    @Modifying
    @Transactional
    @Query(value="update cart set counts=?1 where cart_seq=?2", nativeQuery = true)
    void countsUpdateCart(int count, int cartSeq);

    //카트 상품 삭제
    @Modifying
    @Transactional
    @Query(value="delete from cart where cart_seq=?1", nativeQuery = true)
    void deleteCart(int cart_seq);

    //주문 완료된 상품 재고 차감
    @Modifying
    @Transactional
    @Query(value="update product set stock=stock-?1 \n" +
            "where product_seq=?2", nativeQuery = true)
    void minusProductStock(int product_count, int product_seq);

}
