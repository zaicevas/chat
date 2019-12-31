package com.tozaicevas.chat.dto;

import lombok.Data;

@Data
public class WebSocketRequest {
    private String requestType;
    private User user;
    private int chatRoomId;
    private Message message;
}
