package com.zinkki.shop.repository.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query(value="select * from product p left join category c on p.category_seq = c.categorySeq", nativeQuery = true)
    List<Product> selectProduct();

    @Query(value="select * from product p left join category c on p.category_Seq = c.categorySeq where product_seq=?1", nativeQuery = true)
    List<Product> selectProductBySeq(int product_seq);

    @Query(value="select * from product where category_seq=?1 and product_status=1",nativeQuery = true)
    List<Product> selectProductByCategorySeq(int category_seq);

    @Query(value="select p.* from product p \n" +
            "inner join order_item oi \n" +
            "on p.product_seq = oi.product_seq \n" +
            "group by p.product_seq \n" +
            "order by sum(oi.counts) desc limit 15", nativeQuery = true)
    List<Product> selectProductBest();

}
