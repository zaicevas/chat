package com.tozaicevas.chat.repository;

import com.tozaicevas.chat.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
