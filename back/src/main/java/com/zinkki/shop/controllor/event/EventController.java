package com.zinkki.shop.controllor.event;

import com.zinkki.shop.repository.event.EventRepository;
import com.zinkki.shop.repository.event.Events;
import com.zinkki.shop.service.product.S3Service;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class EventController {

    private final S3Service s3Service;
    private final EventRepository eventRepository;

    //S3 presignedUrl 받기
    @GetMapping("/api/e_presignedUrl")
    @ResponseBody
    String getUrl(@RequestParam String filename) {
        String result = s3Service.createPresignedUrl("event/" + filename);
        System.out.println(result);
        return result;
    }

    //이벤트 작성
    @PostMapping("/api/addEvent")
    @ResponseBody
    String addEvent(@RequestParam int user_seq, @RequestParam String event_title,
                    @RequestParam String event_contents, @RequestParam String event_img) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date now = new Date();
        String date = sdf.format(now);
        try{
            Events event = new Events();
            event.setUser_seq(user_seq);
            event.setEvent_title(event_title);
            event.setEvent_contents(event_contents);
            event.setEvent_img(event_img);
            event.setEvent_date(date);
            eventRepository.save(event);
            return "ok";
        }catch (Exception e){
            System.out.println(e.getMessage());
            return e.getMessage();
        }
    }

    //이벤트리스트
    @GetMapping("/api/eventList")
    @ResponseBody
    List<Events> eventsList() {
        List<Events> result = eventRepository.findAll();
        return result;
    }

    //이벤트상세보기
    @PostMapping("/api/eventDetail")
    @ResponseBody
    Optional<Events> eventDetail(@RequestParam int event_seq) {
        Optional<Events> result = eventRepository.findById(event_seq);
        return result;
    }

    //이벤트 수정
    @Transactional
    @PostMapping("/api/eventEdit")
    @ResponseBody
    String eventEdit(@RequestParam int event_seq,@RequestParam String event_title,
                     @RequestParam String event_contents, @RequestParam String event_img) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date now = new Date();
        String date = sdf.format(now);
        Events event = eventRepository.findById(event_seq).orElseThrow(() ->{
            throw new IllegalArgumentException("No search event_seq" + event_seq);
        });
        event.setEvent_title(event_title);
        event.setEvent_contents(event_contents);
        event.setEvent_img(event_img);
        event.setEvent_updated(date);
        return "ok";
    }

    //이벤트 삭제
    @PostMapping("/api/eventDelete")
    @ResponseBody
    ResponseEntity<String> eventDelete(@RequestParam int event_seq) {
        eventRepository.deleteById(event_seq);
        return ResponseEntity.status(200).body("ok");
    }
}
