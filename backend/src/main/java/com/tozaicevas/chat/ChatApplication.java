package com.tozaicevas.chat;

import com.tozaicevas.chat.model.ChatRoom;
import com.tozaicevas.chat.model.Message;
import com.tozaicevas.chat.model.User;
import com.tozaicevas.chat.repository.ChatRoomRepository;
import com.tozaicevas.chat.repository.ChatRoomRequestRepository;
import com.tozaicevas.chat.repository.MessageRepository;
import com.tozaicevas.chat.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ChatApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChatApplication.class, args);
	}

}
