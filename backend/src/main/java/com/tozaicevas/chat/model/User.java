package com.tozaicevas.chat.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Set;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private String id;

    private String name;
    private String givenName;
    private String familyName;
    private String photoUrl;
    private String email;

    @OneToMany
    private Set<Message> messages;

    @OneToMany
    private Set<ChatRoom> chatRoomsOwned;
}
