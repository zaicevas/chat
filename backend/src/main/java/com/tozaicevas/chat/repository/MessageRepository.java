package com.tozaicevas.chat.repository;

import com.tozaicevas.chat.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Integer> {
}
