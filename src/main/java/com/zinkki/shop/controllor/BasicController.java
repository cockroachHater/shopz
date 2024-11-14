package com.zinkki.shop.controllor;

import com.zinkki.shop.repository.Item;
import com.zinkki.shop.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@Controller
@RequiredArgsConstructor
public class BasicController {

    private final ItemRepository itemRepository;

    @GetMapping("/")
    @ResponseBody
    String hello() {
        return "redirect://http://localhost:3000/";
    }

    @GetMapping("/main")
    String main() { return "index.html"; }

    @GetMapping("/api/test")
    @ResponseBody
    public String test() {
        return "TEST";
    }

    @GetMapping("/api/list")
    @ResponseBody
    List<Item> list() {
        List<Item> result = itemRepository.findAll();
        System.out.println(result);
        return result;
    }

    @PostMapping("/api/add")
    @ResponseBody
    String add(@RequestParam String title, @RequestParam Integer price){
        System.out.println(title);
        System.out.println(price);
        return "done!";
    }

}
