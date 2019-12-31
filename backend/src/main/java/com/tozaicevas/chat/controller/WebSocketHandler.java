package com.tozaicevas.chat.controller;

import com.tozaicevas.chat.dto.WebSocketRequest;
import com.tozaicevas.chat.dto.WebSocketRequestType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
public class WebSocketHandler {
    private Map<WebSocketSession, String> userToSession = new HashMap<>();
    private Map<String, Integer> userToChatRoom = new HashMap<>();

    public void handleRequest(WebSocketRequest request, WebSocketSession session) {
        String requestType = request.getRequestType();
        switch (requestType) {
            case WebSocketRequestType.SAY_HELLO:
                // map user to session and add user to db
                String userId = request.getUser().getId();
                userToSession.put(session, userId);
                log.info(String.format("Added user (id %s) to session (id %s)", userId, session.getId()));
                break;
            case WebSocketRequestType.GET_CHAT_ROOMS:
                // query db for all chat rooms and return them
                break;
            case WebSocketRequestType.SUBSCRIBE_TO_CHAT:
                // map user to chat room
                userToChatRoom.put(request.getUser().getId(), request.getChatRoomId());
                log.info(String.format("User (id %s) subscribed to chat room (id %d)", request.getUser().getId(), request.getChatRoomId()));
                break;
            case WebSocketRequestType.UNSUBSCRIBE_TO_CHAT:
                // unmap user to chat room
                Integer chatRoomId = userToChatRoom.get(request.getUser().getId());
                userToChatRoom.remove(request.getUser().getId());
                log.info(String.format("User (id %s) unsubscribed to chat room (id %d)", request.getUser().getId(), chatRoomId));
                break;
            case WebSocketRequestType.GET_CHAT:
                // find subscribed chat, query db and return all messages
                break;
            case WebSocketRequestType.POST_NEW_MESSAGE:
                // insert message into db and return the message
                break;
            case WebSocketRequestType.CREATE_CHAT_ROOM:
                // insert chat room into db and return the chat room
                break;
            case WebSocketRequestType.REQUEST_TO_JOIN_CHAT_ROOM:
                // insert the request to a database and send the request to chat room's creator
                break;
            case WebSocketRequestType.ACCEPT_REQUEST_TO_JOIN_CHAT_ROOM:
                // update the request record in db to be accepted, add user to participants of the chat room
                // and send notification to the accepted user
                break;
            case WebSocketRequestType.DECLINE_REQUEST_TO_JOIN_CHAT_ROOM:
                // update the request record in db to be accepted, and send notification to the declined user
                break;
            case WebSocketRequestType.GET_REQUESTS_TO_JOIN_CHAT_ROOM:
                // return all requests for chat rooms that have been created by the user
                break;
            case WebSocketRequestType.GET_UNSEEN_REQUEST_RESULTS:
                // return all results from requests that have been created by the user
                break;
        }
    }

    public void removeUserFromConnection(WebSocketSession session) {
        String userId = userToSession.get(session);
        userToSession.remove(session);
        userToChatRoom.remove(userId);
        log.info(String.format("User (id %s) disconnected", userId));
    }

}

