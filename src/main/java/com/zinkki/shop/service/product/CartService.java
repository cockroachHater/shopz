package com.zinkki.shop.service.product;

import com.zinkki.shop.repository.cart.Cart;
import com.zinkki.shop.repository.cart.CartInterface;
import com.zinkki.shop.repository.cart.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;

    public String cartCheck(int user_seq, int product_seq, int counts) {
        try {
            Optional<CartInterface> cartInterface = cartRepository.selectCartByDupl(user_seq, product_seq);
            if (cartInterface.isPresent()) {
                //카트안에 상품 중복 존재 O => counts ++ //카운트 수정
                cartRepository.countsAddCart(counts,user_seq,product_seq);
                return "duplication";
            }else {
                //카트안에 상품 중복 존재 X => insert(.save()) //걍 저장
                try {
                    Cart cart = new Cart();
                    cart.setUser_seq(user_seq);
                    cart.setProduct_seq(product_seq);
                    cart.setCounts(counts);
                    cartRepository.save(cart);
                    return "ok";
                } catch(Exception e) {
                    System.out.println(e.getMessage());
                    return e.getMessage();
                }
            }
        }catch (Exception e) {
            return e.getMessage();
        }
    }
}
