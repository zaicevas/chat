package com.tozaicevas.chat.controller;

import com.google.gson.Gson;
import com.tozaicevas.chat.dto.WebSocketRequest;
import com.tozaicevas.chat.dto.WebSocketRequestType;
import com.tozaicevas.chat.model.ChatRoom;
import com.tozaicevas.chat.model.Message;
import com.tozaicevas.chat.repository.ChatRoomRepository;
import com.tozaicevas.chat.repository.MessageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
@Slf4j
public class WebSocketController extends TextWebSocketHandler {
    private Set<WebSocketSession> sessions = new HashSet<>();
    private final WebSocketHandler webSocketHandler;
    private final MessageRepository messageRepository;
    private final ChatRoomRepository chatRoomRepository;

    public WebSocketController(WebSocketHandler webSocketHandler, MessageRepository messageRepository, ChatRoomRepository chatRoomRepository) {
        this.webSocketHandler = webSocketHandler;
        this.messageRepository = messageRepository;
        this.chatRoomRepository = chatRoomRepository;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        log.info("New WebSocket connection: " + session.getRemoteAddress().toString());
        List<Message> msgs = messageRepository.findAll();
        List<ChatRoom> rooms = chatRoomRepository.findAll();
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
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        WebSocketRequest request = new Gson().fromJson(message.getPayload(), WebSocketRequest.class);
        webSocketHandler.handleRequest(request, session);
    }

}
