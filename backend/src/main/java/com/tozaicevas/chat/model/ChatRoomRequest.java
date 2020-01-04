package com.tozaicevas.chat.model;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomRequest {
    @Id
    @GeneratedValue
    @Expose
    private int id;

    @ManyToOne
    @Expose
    private ChatRoom chatRoom;

    @OneToOne
    @Expose
    private User user;

    @Expose
    private Date createdAt;

    @Expose
    private String status;
}
