package com.tozaicevas.chat.dto;

import com.tozaicevas.chat.model.Message;
import com.tozaicevas.chat.model.User;
import lombok.Data;

@Data
public class WebSocketRequest {
    private String requestType;
    private User user;
    private int chatRoomId;
    private Message message;
    private String chatRoomTitle;
    private int chatRoomRequestId;
}
