package com.tozaicevas.chat.helper;

import com.tozaicevas.chat.model.Message;

public class KeywordChecker {
    public static boolean keywordsPresent(Message message) {
        String regex = "^.*((bomb)|(assassinate)|(President)).*$";
        return message.getText().matches(regex);
    }
}
