package com.tozaicevas.chat.model;

import lombok.Data;

import java.util.Date;

@Data
public class Message {
    private int id;
    private int chatRoomId;
    private String text;
    private Date createdAt;
    private User user;
}
