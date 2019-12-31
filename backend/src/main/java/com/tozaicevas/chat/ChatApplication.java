package com.tozaicevas.chat;

import com.tozaicevas.chat.model.ChatRoom;
import com.tozaicevas.chat.model.Message;
import com.tozaicevas.chat.model.User;
import com.tozaicevas.chat.repository.ChatRoomRepository;
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

	@Bean
	public CommandLineRunner cmd(MessageRepository msgRepository, UserRepository userRepository, ChatRoomRepository chatRoomRepository) {
		return args -> {
			User user = User.builder()
					.id("MYAI23123D")
					.email("ha@gmail.com")
					.build();
			Message msg = Message.builder()
					.text("message text v2")
					.user(user)
					.build();
			ChatRoom room = ChatRoom.builder()
					.creator(user)
					.title("My chatroom")
					.build();

			userRepository.save(user);
			msgRepository.save(msg);
			chatRoomRepository.save(room);
		};
	}
}
