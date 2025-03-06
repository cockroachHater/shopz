package com.zinkki.shop.controllor.faq;

import com.zinkki.shop.repository.faq.Faq;
import com.zinkki.shop.repository.faq.FaqRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class FaqController {

    private final FaqRepository faqRepository;

    //FAQ 작성
    @PostMapping("/api/addFaq")
    @ResponseBody
    String addFaq(@RequestParam int user_seq,
                  @RequestParam String faq_title,
                  @RequestParam String faq_contents) {
        try{
            Faq faq = new Faq();
            faq.setUser_seq(user_seq);
            faq.setFaq_title(faq_title);
            faq.setFaq_contents(faq_contents);
            faqRepository.save(faq);
            return "ok";
        }catch (Exception e){
            System.out.println(e.getMessage());
            return e.getMessage();
        }
    }

    //FAQ리스트
    @GetMapping("/api/faqList")
    @ResponseBody
    List<Faq> faqList() {
        List<Faq> result = faqRepository.findAll();
        return result;
    }

    //FAQ 상세보기
    @PostMapping("/api/faqDetail")
    @ResponseBody
    Optional<Faq> faqDetail(@RequestParam int faq_seq) {
        Optional<Faq> faq = faqRepository.findById(faq_seq);
        return faq;
    }

    //FAQ 수정
    @Transactional
    @PostMapping("/api/faqEdit")
    @ResponseBody
    String faqEdit(@RequestParam int faq_seq, @RequestParam String faq_title,
                   @RequestParam String faq_contents) {
        Faq faq = faqRepository.findById(faq_seq).orElseThrow(()->{
            throw new IllegalArgumentException("No search faq_seq" + faq_seq);
        });
        faq.setFaq_title(faq_title);
        faq.setFaq_contents(faq_contents);
        return"ok";
    }

    //FAQ 삭제
    @PostMapping("/api/faqDelete")
    @ResponseBody
    ResponseEntity<String> faqDelete(@RequestParam int faq_seq) {
        faqRepository.deleteById(faq_seq);
        return ResponseEntity.status(200).body("ok");
    }

}
