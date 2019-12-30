package com.tozaicevas.chat.model;

import lombok.Data;

@Data
public class User {
    private String id;
    private String name;
    private String givenName;
    private String familyName;
    private String photoUrl;
    private String email;
}
