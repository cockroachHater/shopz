package com.zinkki.shop.controllor.product;

import com.zinkki.shop.repository.category.Category;
import com.zinkki.shop.repository.category.CategoryRepository;
import com.zinkki.shop.repository.product.Product;
import com.zinkki.shop.repository.product.ProductRepository;
import com.zinkki.shop.service.product.S3Service;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class ProductController {
    private final CategoryRepository categoryRepository;
    private final S3Service s3Service;
    private final ProductRepository productRepository;

    //카테고리리스트
    @GetMapping("/api/categoryList")
    @ResponseBody
    List<Category> categoryList() {
        List<Category> result = categoryRepository.findAll();
        System.out.println(result);
        return result;
    }

    //S3 presignedURL 받기
    @GetMapping("/api/presignedUrl")
    @ResponseBody
    String getUrl(@RequestParam String filename) {
        String result = s3Service.createPresignedUrl("product/"+filename);
        System.out.println(result);
        return result;
    }

    //상품등록
    @PostMapping("/api/addProduct")
    @ResponseBody
    String addProduct(@RequestParam int category_seq, @RequestParam String product_name,
                      @RequestParam int price, @RequestParam String img,
                      @RequestParam String product_detail, @RequestParam int stock,
                      @RequestParam int product_status) {
        try {
            Product product = new Product();
            product.setCategory_seq(category_seq);
            product.setProduct_name(product_name);
            product.setPrice(price);
            product.setImg(img);
            product.setProduct_detail(product_detail);
            product.setStock(stock);
            product.setProduct_status(product_status);
            productRepository.save(product);
            return "ok";
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return e.getMessage();
        }
    }

    //상품리스트(관리자페이지에서 전체 상품리스트)
    @GetMapping("/api/productList")
    @ResponseBody
    List<Product> productList() {
        List<Product> result = productRepository.selectProduct();
        return result;
    }

    //상품리스트(사용자페이지에서 카테고리별 상품리스트)
    @PostMapping("/api/productCategory")
    @ResponseBody
    List<Product> productListWithCategory(@RequestParam int category_seq) {
        System.out.println("----------");
        System.out.println(category_seq);
        if(category_seq == -1) return null;
        if(category_seq == 5) { //best seller
            System.out.println("Best Seller");
            List<Product> best = productRepository.selectProductBest();
            return best;
        }else {
            List<Product> result = productRepository.selectProductByCategorySeq(category_seq);
            return result;
        }
    }

    //상품디테일
    @PostMapping("/api/productDetail")
    @ResponseBody
    List<Product> productDetail(@RequestParam int product_seq) {
        System.out.println(product_seq);
        List<Product> result= productRepository.selectProductBySeq(product_seq);
        return result;
    }

    //상품 수정
    @Transactional //jpa save 대신
    @PostMapping("/api/productEdit")
    @ResponseBody
    String productEdit(@RequestParam int product_seq, @RequestParam String product_name,
                       @RequestParam int price, @RequestParam String img, @RequestParam String product_detail,
                       @RequestParam int stock, @RequestParam int product_status) {
    Product product = productRepository.findById(product_seq).orElseThrow(() -> {
        throw new IllegalArgumentException("No search product_seq" + product_seq);
    });
    product.setProduct_name(product_name);
    product.setPrice(price);
    product.setImg(img);
    product.setProduct_detail(product_detail);
    product.setProduct_status(product_status);
    product.setStock(stock);
    return "ok";
    }
    
    //상품 삭제
    @PostMapping("/api/productDelete")
    @ResponseBody
    ResponseEntity<String> productDelete(@RequestParam int product_seq) {
        productRepository.deleteById(product_seq);
        return ResponseEntity.status(200).body("ok");
    }

}
