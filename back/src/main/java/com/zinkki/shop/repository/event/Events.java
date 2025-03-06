package com.zinkki.shop.repository.event;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Events {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    public int event_seq;

    @Column
    public int user_seq;
    public String event_title;
    public String event_contents;
    public String event_date;
    public int event_view_counts;
    public String event_updated;
    public String event_img;
}
