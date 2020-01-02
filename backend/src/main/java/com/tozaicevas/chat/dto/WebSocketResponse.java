package com.tozaicevas.chat.dto;

import com.tozaicevas.chat.model.ChatRoom;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class WebSocketResponse {
    private String responseType;
    private List<ChatRoom> chatRooms;
}
