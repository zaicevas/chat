package com.tozaicevas.chat.model;

import com.google.gson.annotations.Expose;
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
    @Expose
    private int id;

    @Expose
    private String text;

    @Expose
    private Date createdAt;

    @ManyToOne
    @Expose
    private User user;

}
