package com.tozaicevas.chat.config;

import com.tozaicevas.chat.controller.WebSocketController;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    private final WebSocketController webSocketController;

    public WebSocketConfig(WebSocketController webSocketController) {
        this.webSocketController = webSocketController;
    }

    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketController, "/chat").setAllowedOrigins("*");
    }
}