package com.zinkki.shop.controllor;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequiredArgsConstructor
public class BasicController {


    @GetMapping("/main")
    String main() { return "index.html"; }

}
