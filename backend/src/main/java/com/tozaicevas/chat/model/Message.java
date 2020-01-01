package com.tozaicevas.chat.model;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue
    @SerializedName(value = "_id", alternate = "id")
    private int id;

    private String text;
    private Date createdAt;

    @ManyToOne
    private User user;

    @OneToOne
    private transient ChatRoom chatRoom;

}
