package com.tozaicevas.chat.repository;

import com.tozaicevas.chat.model.ChatRoomRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRequestRepository extends JpaRepository<ChatRoomRequest, Integer> {
}
