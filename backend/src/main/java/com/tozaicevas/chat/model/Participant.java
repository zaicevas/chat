package com.tozaicevas.chat.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Participant {
    @Id
    @GeneratedValue
    private int id;

    @ManyToOne
    private User user;

    @OneToOne
    private ChatRoom chatRoom;
}
