import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import SystemMessage from '../components/SystemMessage';
import Colors from '../constants/Colors';
import WebSocketClient from '../helper/WebSocketClient';

const getInitialSystemMessage = chatRoom => ({
  _id: -1,
  text: `Chat room was created by ${chatRoom.creator.name}`,
  createdAt: new Date(chatRoom.createdAt),
  system: true,
  user: {
    avatar: chatRoom.creator.avatar
  }
});

const ChatScreen = ({ navigation }) => {
  const chatRoom = navigation.getParam('chatRoom', {});
  const user = navigation.getParam('user', {});

  const [messages, setMessages] = useState([]);
  const onSend = (newMessages = []) => {
    WebSocketClient.postNewMessage(newMessages[0] || {}, chatRoom.id);
    //    setMessages(GiftedChat.append(messages, newMessages));
  };

  useEffect(() => {
    WebSocketClient.subscribeToChat(chatRoom.id);
    WebSocketClient.onFetchedChat = messages => {
      const messagesWithParsedTime = messages.map(msg => ({
        ...msg,
        createdAt: new Date(msg.createdAt)
      }));
      setMessages(
        [...messagesWithParsedTime, getInitialSystemMessage(chatRoom)].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    };
    WebSocketClient.getChat(chatRoom.id);
    return () => WebSocketClient.unsubscribeToChat();
  }, [chatRoom]);

  useEffect(() => {
    WebSocketClient.onUpdatedChat = message => {
      const messageWithParsedTime = {
        ...message,
        createdAt: new Date(message.createdAt)
      };
      setMessages(
        [...messages, messageWithParsedTime].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    };
  }, [messages]);

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        renderSystemMessage={({ currentMessage }) => (
          <SystemMessage currentMessage={currentMessage} />
        )}
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={user}
        renderUsernameOnMessage
      />
    </View>
  );
};

ChatScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title', 'Chat'),
  headerRight: () => (
    <MaterialIcons
      name="add-circle"
      size={28}
      style={{ paddingRight: 12 }}
      color={Colors.emerald}
    />
  )
});

export default ChatScreen;
