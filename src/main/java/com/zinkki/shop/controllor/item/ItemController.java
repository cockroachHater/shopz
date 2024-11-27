package com.zinkki.shop.controllor.item;

import com.zinkki.shop.repository.item.Item;
import com.zinkki.shop.repository.item.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ItemController {
    private final ItemRepository itemRepository;

    @GetMapping("/api/list")
    @ResponseBody
    List<Item> list() {
        List<Item> result = itemRepository.findAll();
        System.out.println(result);
        return result;
    }

    @PostMapping("/api/add")
    @ResponseBody
    String add(@RequestParam String title, @RequestParam int price){
        try {
            if(title != null && !title.equals("") && price > 0 && title.trim().isEmpty() == false){
                Item item = new Item();
                item.setTitle(title);
                item.setPrice(price);
                itemRepository.save(item);
                return "success";
            }else {
                System.out.println("error");
                return "error";
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "error";
        }
    }
}
