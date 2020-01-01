package com.tozaicevas.chat.controller;

import com.google.gson.Gson;
import com.tozaicevas.chat.dto.WebSocketRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
@Slf4j
public class WebSocketController extends TextWebSocketHandler {
    private Set<WebSocketSession> sessions = new HashSet<>();
    private final WebSocketHandler webSocketHandler;

    public WebSocketController(WebSocketHandler webSocketHandler) {
        this.webSocketHandler = webSocketHandler;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        log.info("New WebSocket connection: " + session.getRemoteAddress().toString());
        sessions = Stream.concat(sessions.stream(), Stream.of(session))
                .collect(Collectors.toSet());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions = sessions.stream()
                .filter(s -> !session.equals(s))
                .collect(Collectors.toSet());
        webSocketHandler.removeUserFromConnection(session);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        WebSocketRequest request = new Gson().fromJson(message.getPayload(), WebSocketRequest.class);
        webSocketHandler.handleRequest(request, session, sessions);
    }

}
