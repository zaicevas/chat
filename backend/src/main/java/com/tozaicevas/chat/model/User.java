package com.tozaicevas.chat.model;

import com.google.gson.annotations.SerializedName;
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
    @SerializedName(value = "_id", alternate = "id")
    private String id;

    private String name;
    private String avatar;

    @OneToMany
    private Set<Message> messages;

    @OneToMany
    private Set<ChatRoom> chatRoomsOwned;
}
