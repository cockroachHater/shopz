package com.zinkki.shop.repository.cart;

public interface CartInterface {
    int getCartSeq();
    int getUserSeq();
    int getProductSeq();
    String getProductName();
    int getPrice();
    String getImg();
    int getProductCounts();
}
