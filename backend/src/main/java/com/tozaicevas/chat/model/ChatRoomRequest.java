package com.tozaicevas.chat.model;

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
    private int id;

    @ManyToOne
    private transient ChatRoom chatRoom;

    @OneToOne
    private transient User user;

    private Date createAt;
    private String status;
    private boolean seen;
}
