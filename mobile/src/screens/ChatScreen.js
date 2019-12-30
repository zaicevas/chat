import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import SystemMessage from '../components/SystemMessage';
import Colors from '../constants/Colors';
import { toGiftedChatUser } from '../helper/Parse';
import WebSocketClient from '../helper/WebSocketClient';

const MOCK_MESSAGES = [
  {
    _id: 2,
    text: 'Random message',
    createdAt: new Date(),
    user: {
      _id: 3,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 1,
    text: 'Chat room created by tozaicevas@gmail.com',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
    system: true,
  },
];

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const onSend = (newMessages = []) => setMessages(GiftedChat.append(messages, newMessages));
  const googleUser = navigation.getParam('user', {});
  const user = toGiftedChatUser(googleUser);

  useEffect(() => {
    console.log("Trying to connect to websocket");
    const ws = WebSocketClient.connect();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        renderSystemMessage={({ currentMessage }) => (<SystemMessage currentMessage={currentMessage} />)}
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={user}
        renderUsernameOnMessage
      />
      {
      Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
   }
    </View>
  );
};


ChatScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title', 'Chat'),
  headerRight: () => (<MaterialIcons name="add-circle" size={28} style={{ paddingRight: 12 }} color={Colors.emerald} />),
});

export default ChatScreen;
