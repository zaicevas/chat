import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import SystemMessage from '../components/SystemMessage';
import { toGiftedChatUser } from '../helper/Parse';

const MOCK_MESSAGES = [
  {
    _id: 1,
    text: 'Chat room created by Tomas Zaicevas',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
    system: true,
  },
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
];

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const onSend = (newMessages = []) => setMessages(GiftedChat.append(messages, newMessages));
  const googleUser = navigation.getParam('user', {});
  const user = toGiftedChatUser(googleUser);

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        renderSystemMessage={({ currentMessage }) => (<SystemMessage currentMessage={currentMessage} />)}
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={user}
      />
      {
      Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
   }
    </View>
  );
};


ChatScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title', 'Chat'),
});

export default ChatScreen;
