package com.tozaicevas.chat.dto;

import com.google.gson.annotations.Expose;
import com.tozaicevas.chat.model.ChatRoom;
import com.tozaicevas.chat.model.ChatRoomRequest;
import com.tozaicevas.chat.model.Message;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class WebSocketResponse {
    @Expose
    private String responseType;

    @Expose
    private Set<ChatRoom> chatRooms;

    @Expose
    private Set<Message> messages;

    @Expose
    private Message message;

    @Expose
    private Set<ChatRoomRequest> chatRoomRequests;

    @Expose
    private ChatRoom chatRoom;
}
