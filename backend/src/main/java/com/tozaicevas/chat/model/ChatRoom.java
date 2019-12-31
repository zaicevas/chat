package com.tozaicevas.chat.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoom {
    @Id
    @GeneratedValue
    private int id;

    private String title;
    private Date createdAt;

    @OneToOne
    private Message lastMessage;

    @OneToMany
    private Set<Message> messages;

    @OneToOne
    private User creator;

    @OneToMany
    private Set<User> participants;
}
