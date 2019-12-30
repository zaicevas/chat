package com.tozaicevas.chat.dto;

import lombok.Data;

@Data
public class WebSocketRequest {
    private String messageType;
    private User user;
    private int chatRoomId;
    private Message message;
}
