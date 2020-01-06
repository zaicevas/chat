package com.tozaicevas.chat.helper;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.tozaicevas.chat.model.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.*;
import java.lang.reflect.Type;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
@Slf4j
public class KeywordSaverImpl implements KeywordSaver {
    private static final Type MESSAGE_TYPE = new TypeToken<List<Message>>() {}.getType();
    private static final String FILE_PATH = "badMessages.txt";

    private final Gson gson;

    public KeywordSaverImpl(Gson gson) {
        this.gson = gson;
    }

    @Override
    public synchronized void save(Message message) {
        try {
            FileReader fileReader = new FileReader(FILE_PATH);
            JsonReader jsonReader = new JsonReader(fileReader);
            List<Message> messages = gson.fromJson(jsonReader, MESSAGE_TYPE);
            List<Message> updatedMessages = Stream.concat(messages.stream(), Stream.of(message))
                    .collect(Collectors.toList());
            jsonReader.close();

            writeMessages(updatedMessages);
            log.info(String.format("Saved a new message into %s", FILE_PATH));
        } catch (FileNotFoundException ex) {
            createAndSave(message);
        } catch (IOException ex) {
            log.error(ex.getMessage());
        }
    }

    private void createAndSave(Message message) {
        try {
            boolean isCreated = new File(FILE_PATH).createNewFile();
            if (isCreated) {
                writeMessages(Collections.singletonList(message));
                log.info(String.format("Created %s and saved first message", FILE_PATH));
            } else
                log.info(String.format("Couldn't create %s", FILE_PATH));
        } catch (IOException ioex) {
            log.error(ioex.getMessage());
        }
    }

    private void writeMessages(List<Message> messages) throws IOException {
        FileWriter fileWriter = new FileWriter(FILE_PATH);
        gson.toJson(messages, fileWriter);
        fileWriter.close();
    }
}
