package com.tozaicevas.chat.dto;

public interface WebSocketResponseType {
    String ALL_CHAT_ROOMS = "ALL_CHAT_ROOMS";
    String ALL_CHAT = "ALL_CHAT";
    String UPDATE_CHAT = "UPDATE_CHAT";
    String NEW_REQUEST = "NEW_REQUEST";
    String NEW_ACCEPTED_REQUEST = "NEW_ACCEPTED_REQUEST";
    String NEW_DECLINED_REQUEST = "NEW_DECLINED_REQUEST";
    String ALL_REQUESTS_TO_JOIN_CHAT_ROOM = "ALL_REQUESTS_TO_JOIN_CHAT_ROOM";
}
