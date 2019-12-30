package com.tozaicevas.chat.dto;

import com.google.gson.annotations.SerializedName;
import lombok.Data;

@Data
public class User {
    @SerializedName(value = "_id", alternate = "id")
    private String id;

    private String name;
    private String avatar;
}
