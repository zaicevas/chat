package com.tozaicevas.chat.controller;

import com.google.gson.Gson;
import com.tozaicevas.chat.dto.WebSocketRequest;
import com.tozaicevas.chat.dto.WebSocketRequestType;
import com.tozaicevas.chat.dto.WebSocketResponse;
import com.tozaicevas.chat.dto.WebSocketResponseType;
import com.tozaicevas.chat.helper.UtilException;
import com.tozaicevas.chat.model.ChatRoom;
import com.tozaicevas.chat.model.Message;
import com.tozaicevas.chat.model.User;
import com.tozaicevas.chat.repository.ChatRoomRepository;
import com.tozaicevas.chat.repository.ChatRoomRequestRepository;
import com.tozaicevas.chat.repository.MessageRepository;
import com.tozaicevas.chat.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
@Slf4j
public class WebSocketHandler {
    private Map<WebSocketSession, String> sessionToUser = new HashMap<>();
    private Map<String, Integer> userToChatRoom = new HashMap<>();

    private ChatRoomRepository chatRoomRepository;
    private ChatRoomRequestRepository chatRoomRequestRepository;
    private MessageRepository messageRepository;
    private UserRepository userRepository;

    public WebSocketHandler(ChatRoomRepository chatRoomRepository,
                            ChatRoomRequestRepository chatRoomRequestRepository,
                            MessageRepository messageRepository,
                            UserRepository userRepository) {

        this.chatRoomRepository = chatRoomRepository;
        this.chatRoomRequestRepository = chatRoomRequestRepository;
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    public void handleRequest(WebSocketRequest request, WebSocketSession session, Set<WebSocketSession> sessions) throws IOException {
        String requestType = request.getRequestType();
        switch (requestType) {
            case WebSocketRequestType.SAY_HELLO: {
                // map user to session and add user to db
                User user = request.getUser();
                sessionToUser.put(session, user.getId());
                userRepository.save(user);
                log.info(String.format("Added user (id: %s) to session (id: %s)", user.getId(), session.getId()));
                break;
            }
            case WebSocketRequestType.GET_CHAT_ROOMS: {
                // query db for all chat rooms and return them
                WebSocketResponse response = WebSocketResponse.builder()
                        .responseType(WebSocketResponseType.ALL_CHAT_ROOMS)
                        .chatRooms(new HashSet<>(chatRoomRepository.findAll()))
                        .build();
                String chatRooms = new Gson().toJson(response);
                session.sendMessage(new TextMessage(chatRooms));
                log.info(String.format("Sent chat rooms to user (id: %s)", sessionToUser.get(session)));
                break;
            }
            case WebSocketRequestType.SUBSCRIBE_TO_CHAT: {
                // map user to chat room
                userToChatRoom.put(request.getUser().getId(), request.getChatRoomId());
                log.info(String.format("User (id: %s) subscribed to chat room (id: %d)", request.getUser().getId(), request.getChatRoomId()));
                break;
            }
            case WebSocketRequestType.UNSUBSCRIBE_TO_CHAT: {
                // unmap user to chat room
                int chatRoomId = userToChatRoom.get(sessionToUser.get(session));
                // Integer chatRoomId = userToChatRoom.get(request.getUser().getId());
                userToChatRoom.remove(request.getUser().getId());
                log.info(String.format("User (id: %s) unsubscribed to chat room (id: %d)", request.getUser().getId(), chatRoomId));
                break;
            }
            case WebSocketRequestType.GET_CHAT: {
                // find subscribed chat, query db and return all messages
                int chatRoomId = request.getChatRoomId();
                ChatRoom emptyChatRoom = ChatRoom.builder()
                        .messages(Collections.emptySet())
                        .build();
                Set<Message> chatMessages = chatRoomRepository.findById(chatRoomId).orElse(emptyChatRoom).getMessages();
                WebSocketResponse response = WebSocketResponse.builder()
                        .responseType(WebSocketResponseType.ALL_CHAT)
                        .messages(chatMessages)
                        .build();
                TextMessage json = new TextMessage(new Gson().toJson(response));
                session.sendMessage(json);
                log.info(String.format("Chat (id: %d) sent to user (id: %s)", chatRoomId, sessionToUser.get(session)));
                break;
            }
            case WebSocketRequestType.POST_NEW_MESSAGE: {
                // insert message into db and return the message
                Message chatMessage = request.getMessage();
                chatRoomRepository.findById(request.getChatRoomId())
                        .ifPresent(UtilException.rethrowConsumer((chatRoom) -> {
                            userRepository.findById(chatMessage.getUser().getId()).ifPresent(UtilException.rethrowConsumer(user -> {
                                    //chatMessage.setChatRoom(chatRoom);
                                    Message dbMessage = messageRepository.save(chatMessage);
                                    chatRoom.setLastMessage(dbMessage);
                                    Set<Message> updatedMessages = Stream.concat(chatRoom.getMessages().stream(), Stream.of(dbMessage))
                                            .collect(Collectors.toSet());

                                    chatRoom.setMessages(updatedMessages);
                                    chatRoomRepository.save(chatRoom);

                                    WebSocketResponse response = WebSocketResponse.builder()
                                            .responseType(WebSocketResponseType.UPDATE_CHAT)
                                            .message(dbMessage)
                                            .build();
                                    TextMessage newMessageJson = new TextMessage(new Gson().toJson(response));
                                    Map<String, Integer> subscribedSessions = userToChatRoom.entrySet().stream()
                                            .filter(entry -> entry.getValue() == request.getChatRoomId())
                                            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
                                    sessionToUser.entrySet().stream()
                                            .filter(entry -> subscribedSessions.containsKey(entry.getValue()))
                                            .forEach(UtilException.rethrowConsumer(entry -> entry.getKey().sendMessage(newMessageJson)));

                                    WebSocketResponse getChatRooms = WebSocketResponse.builder()
                                            .responseType(WebSocketResponseType.ALL_CHAT_ROOMS)
                                            .chatRooms(new HashSet<>(chatRoomRepository.findAll()))
                                            .build();
                                    TextMessage allChatRoomsJson = new TextMessage(new Gson().toJson(getChatRooms));
                                    chatRoom.getParticipants().stream()
                                            .filter(participant -> sessionToUser.values().contains(participant.getId()))
                                            .forEach(UtilException.rethrowConsumer(participant -> sessionToUser.entrySet().stream()
                                                    .filter(entry -> participant.getId().equals(entry.getValue()))
                                                    .map(Map.Entry::getKey)
                                                    .forEach(UtilException.rethrowConsumer(s -> s.sendMessage(allChatRoomsJson)))));
                                    session.sendMessage(allChatRoomsJson);
//                                    sessions.forEach(UtilException.rethrowConsumer(s -> s.sendMessage(allChatRoomsJson)));
                                    log.info(String.format("Added new message (id: %d) to chat room (id: %d)", dbMessage.getId(), request.getChatRoomId()));
                                }));
                            }));
                break;
            }
            case WebSocketRequestType.CREATE_CHAT_ROOM: {
                // insert chat room into db, send the new chat room to all sessions
                ChatRoom chatRoom = ChatRoom.builder()
                        .title(request.getChatRoomTitle())
                        .creator(request.getUser())
                        .createdAt(new Date())
                        .messages(new HashSet<>())
                        .participants(new HashSet<>())
                        .build();
                chatRoomRepository.save(chatRoom);
                WebSocketResponse response = WebSocketResponse.builder()
                        .responseType(WebSocketResponseType.ALL_CHAT_ROOMS)
                        .chatRooms(new HashSet<>(chatRoomRepository.findAll()))
                        .build();
                String chatRooms = new Gson().toJson(response);
                TextMessage responseString = new TextMessage(chatRooms);
                // special class with responseType needed to specify purpose of the message
                sessions.forEach(UtilException.rethrowConsumer(s -> s.sendMessage(responseString)));
                log.info(String.format("Created chat room (title: %s) and sent ALL_CHAT_ROOMS to all sessions", request.getChatRoomTitle()));
                break;
            }
            case WebSocketRequestType.REQUEST_TO_JOIN_CHAT_ROOM: {
                // insert the request to a database and send the request to chat room's creator
                break;
            }
            case WebSocketRequestType.ACCEPT_REQUEST_TO_JOIN_CHAT_ROOM: {
                // update the request record in db to be accepted, add user to participants of the chat room
                // and send notification to the accepted user
                break;
            }
            case WebSocketRequestType.DECLINE_REQUEST_TO_JOIN_CHAT_ROOM: {
                // update the request record in db to be accepted, and send notification to the declined user
                break;
            }
            case WebSocketRequestType.GET_REQUESTS_TO_JOIN_CHAT_ROOM: {
                // return all requests for chat rooms that have been created by the user
                break;
            }
            case WebSocketRequestType.GET_UNSEEN_REQUEST_RESULTS: {
                // return all results from requests that have been created by the user
                break;
            }
            default:
                break;
        }
    }

    public void removeUserFromConnection(WebSocketSession session) {
        String userId = sessionToUser.get(session);
        sessionToUser.remove(session);
        userToChatRoom.remove(userId);
        log.info(String.format("User (id %s) disconnected", userId));
    }

}

