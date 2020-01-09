package com.tozaicevas.chat.helper;

import com.tozaicevas.chat.model.Message;
import org.junit.Test;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class KeywordCheckerTest {

    @Test
    public void keywordPresent_shouldReturnFalse() {
        String a = "Hello, mr. president!";
        String b = "qwertyuiopasdflgk";
        String c = "";
        String d = "BOMB";
        List<Message> messages = Stream.of(Message.builder().text(a).build(),
                Message.builder().text(b).build(),
                Message.builder().text(c).build(),
                Message.builder().text(d).build())
                .collect(Collectors.toList());

        messages.forEach(msg -> assertFalse(KeywordChecker.keywordsPresent(msg)));
    }

    @Test
    public void keywordPresent_shouldReturnTrue() {
        String a = "Hello, mr. President!";
        String b = "qweqweqwebombqwewq";
        String c = "there's a President!";
        String d = "assassinate him!";
        List<Message> messages = Stream.of(Message.builder().text(a).build(),
                Message.builder().text(b).build(),
                Message.builder().text(c).build(),
                Message.builder().text(d).build())
                .collect(Collectors.toList());

        messages.forEach(msg -> assertTrue(KeywordChecker.keywordsPresent(msg)));
    }

}
