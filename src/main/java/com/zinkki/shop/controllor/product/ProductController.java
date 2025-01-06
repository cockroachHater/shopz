package com.zinkki.shop.controllor.product;

import com.zinkki.shop.repository.category.Category;
import com.zinkki.shop.repository.category.CategoryRepository;
import com.zinkki.shop.repository.product.Product;
import com.zinkki.shop.repository.product.ProductRepository;
import com.zinkki.shop.service.product.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
                      @RequestParam String product_detail, @RequestParam int stock) {
        System.out.println(category_seq);
        System.out.println(product_name);
        System.out.println(price);
        System.out.println(img);
        System.out.println(product_detail);
        System.out.println(stock);
        try {
            Product product = new Product();

            product.setProduct_seq(category_seq);
            product.setProduct_name(product_name);
            product.setPrice(price);
            product.setImg(img);
            product.setProduct_detail(product_detail);
            product.setStock(stock);

            productRepository.save(product);
            return "ok";
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return e.getMessage();
        }
    }

}
