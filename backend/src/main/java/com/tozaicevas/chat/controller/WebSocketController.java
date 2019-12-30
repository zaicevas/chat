package com.tozaicevas.chat.controller;

import com.google.gson.Gson;
import com.tozaicevas.chat.dto.User;
import com.tozaicevas.chat.dto.WebSocketRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class WebSocketController extends TextWebSocketHandler {
    private Set<WebSocketSession> sessions = new HashSet<>();
    private Map<String, WebSocketSession> userToSession = new HashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        System.out.println(session.getId());
        sessions = Stream.concat(sessions.stream(), Stream.of(session)).collect(Collectors.toSet());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {

    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message)
            throws IOException {

        for (WebSocketSession webSocketSession : sessions) {
            WebSocketRequest value = new Gson().fromJson(message.getPayload(), WebSocketRequest.class);
            System.out.println(value.toString());
        }
    }

}
