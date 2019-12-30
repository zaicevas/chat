package com.tozaicevas.chat.dto;

public interface WebSocketMessageType {
    String SUBSCRIBE_TO_CHAT = "SUBSCRIBE_TO_CHAT";
    String GET_ALL_CHAT = "GET_ALL_CHAT";
    String POST_NEW_MESSAGE = "POST_NEW_MESSAGE";
}
