package com.zinkki.shop.controllor.order;

import com.zinkki.shop.repository.cart.CartRepository;
import com.zinkki.shop.repository.order.CustomOrderInterface;
import com.zinkki.shop.repository.order.OrderRepository;
import com.zinkki.shop.service.order.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class OrderController {

    private final OrderRepository orderRepository;
    private final OrderService orderService;
    private final CartRepository cartRepository;

    //카트에서 선택 후 주문
    @PostMapping("/api/productOrder")
    @ResponseBody
    String createOrderInfo(@RequestParam int user_seq,
                           @RequestParam String post_code,
                           @RequestParam String address,
                           @RequestParam String address_detail,
                           @RequestParam List<Integer> product_seq_list,
                           @RequestParam List<Integer> product_count_list,
                           @RequestParam List<Integer> cart_seq_list) {
        //주문 TB 저장 & SelectKey 반환
        int ordersSeletKey = orderService.orderInsertAndGetSelectKey
                        (user_seq, post_code, address, address_detail);
        if(ordersSeletKey != -100) { //에러코드=-100
            //주문 items insert & 주문완료된 상품 재고 차감시키기
            for(int i=0; i<product_seq_list.size(); i++) {
                //주문 items insert
                orderRepository.insertOrderItems(ordersSeletKey,
                        product_seq_list.get(i), product_count_list.get(i));
                //주문완료된 상품 재고 차감시키기
                cartRepository.minusProductStock
                        (product_count_list.get(i),product_seq_list.get(i));
            }
            //주문 완료 후, 카트에 담긴 상품 삭제
            for(Integer cart_seq : cart_seq_list) {
                System.out.println(cart_seq);
                cartRepository.deleteCart(cart_seq); //장바구니 상품 삭제
            }
            return "ok";
        }else {
            return "failed";
        }
    }

    //바로주문
    @PostMapping("/api/directOrder")
    @ResponseBody
    String directOrder(@RequestParam int user_seq,
                       @RequestParam String post_code,
                       @RequestParam String address,
                       @RequestParam String address_detail,
                       @RequestParam int product_seq,
                       @RequestParam int product_count) {
        //주문 TB 저장 & SelectKey 반환
        int ordersSeletKey = orderService.orderInsertAndGetSelectKey
                        (user_seq, post_code, address, address_detail);
        if(ordersSeletKey != -100) { //에러코드=-100
            //주문 items insert
            orderRepository.insertOrderItems(ordersSeletKey,product_seq,product_count);
            //주문완료된 상품 재고 차감시키기
            cartRepository.minusProductStock(product_count,product_seq);
            return "ok";
        }else {
            return "failed";
        }
    }

    //유저별 주문 목록
    @PostMapping("/api/orderList")
    @ResponseBody
    List<CustomOrderInterface> orderList(@RequestParam int user_seq) {
        List<CustomOrderInterface> result = orderRepository.selectOrderList(user_seq);
        return result;
    }

    //관리자-전체 주문목록
    @GetMapping("/api/allOrderList")
    @ResponseBody
    List<CustomOrderInterface> allOrderList() {
        List<CustomOrderInterface> result = orderRepository.selectAllOrderList();
        return result;
    }
}
