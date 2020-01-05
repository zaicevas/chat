package com.tozaicevas.chat.model;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.*;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoom {
    @Id
    @GeneratedValue
    @Expose
    private int id;

    @Expose
    private String title;

    @Expose
    private Date createdAt;

    @OneToOne
    @Expose
    private Message lastMessage;

    @OneToMany(fetch = FetchType.EAGER)
    @Builder.Default
    private Set<Message> messages = new HashSet<>();

    @OneToOne
    @Expose
    private User creator;

    @ManyToMany(fetch = FetchType.EAGER)
    @Expose
    @Builder.Default
    private Set<User> participants = new HashSet<>();
}
