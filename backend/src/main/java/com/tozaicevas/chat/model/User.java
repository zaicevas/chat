package com.tozaicevas.chat.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @SerializedName(value = "_id", alternate = "id")
    @Expose
    private String id;

    @Expose
    private String name;

    @Expose
    private String avatar;

//    @OneToMany(fetch = FetchType.EAGER)
//    private transient List<Message> messages;

    //@OneToMany(fetch = FetchType.EAGER)
    //private transient List<ChatRoom> chatRoomsOwned;
}
