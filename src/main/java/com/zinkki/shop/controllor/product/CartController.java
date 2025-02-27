package com.zinkki.shop.controllor.product;

import com.zinkki.shop.repository.cart.CartRepository;
import com.zinkki.shop.repository.cart.CustomCartInterface;
import com.zinkki.shop.service.product.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class CartController {
    private final CartRepository cartRepository;
    private final CartService cartService;

    //카트에 상품 추가
    @PostMapping("/api/addCart")
    @ResponseBody
    String addCart(@RequestParam int user_seq,
                   @RequestParam int product_seq,
                   @RequestParam int counts) {
        String result = cartService.cartCheck(user_seq, product_seq, counts);
        return result;
    }

    //카트 리스트
    @PostMapping("/api/cartList")
    @ResponseBody
    List<CustomCartInterface> cartList(@RequestParam int user_seq) {
        List<CustomCartInterface> result = cartRepository.selectCartByUserAndProduct(user_seq);
        return result;
    }

    //카트 상세
    @PostMapping("/api/cartProductDetail")
    @ResponseBody
    List<CustomCartInterface> cartDuplicationCheck(@RequestParam int cartSeq) {
        List<CustomCartInterface> result = cartRepository.selectCartByCart(cartSeq);
        return result;
    }

    //카트 상품갯수 수정
    @PostMapping("/api/cartCountUpdate")
    @ResponseBody
    String updateProductCount(@RequestParam int cartSeq, int count) {
        try{
            cartRepository.countsUpdateCart(count, cartSeq);
            return "ok";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    //카트 선택 상품 삭제
    @PostMapping("/api/cartProductDelete")
    @ResponseBody
    String deleteProduct(@RequestParam List<Integer> cartSeq) {
        for(Integer cartSeqInteger : cartSeq){
            System.out.println(cartSeqInteger);
            cartRepository.deleteCart(cartSeqInteger);
        }
        return "ok";
    }

    //카트 선택 상품 주문
    @PostMapping("/api/cartProductOrder")
    @ResponseBody
    List<CustomCartInterface> orderProduct(@RequestParam List<Integer> cartSeq) {
        List<CustomCartInterface> result = new ArrayList<>();
        for(int i=0;i<cartSeq.size();i++){
            var list = cartRepository.selectCartByCart(cartSeq.get(i));
            result.addAll(list);
        }
        return result;
    }
}
