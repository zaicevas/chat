package com.tozaicevas.chat.dto;

import com.tozaicevas.chat.model.ChatRoom;
import com.tozaicevas.chat.model.Message;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
@Builder
public class WebSocketResponse {
    private String responseType;
    private Set<ChatRoom> chatRooms;
    private Set<Message> messages;
    private Message message;
}
