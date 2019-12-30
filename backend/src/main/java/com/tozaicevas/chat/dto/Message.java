package com.tozaicevas.chat.dto;

import com.google.gson.annotations.SerializedName;
import lombok.Data;

import java.util.Date;

@Data
public class Message {
    @SerializedName(value = "_id", alternate = "id")
    private int id;

    private String text;
    private Date createdAt;
    private User user;
}
