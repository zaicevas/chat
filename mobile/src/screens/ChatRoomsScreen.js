import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Thumbnail,
  Title
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import Dialog from 'react-native-dialog';
import { SCREEN_CHAT } from '../constants/Screens';
import WebSocketClient from '../helper/WebSocketClient';

const LOCKED_MESSAGE = '???';

/* const isUserPresentInChatRoom = (user, chatRoom) =>
  chatRoom.participants.some(participant => participant._id === user._id) ||
  chatRoom.creator._id === user._id; */
const isUserPresentInChatRoom = () => true;

const ChatRooms = ({ chatRooms, navigation, user, onSendRequest }) => (
  <List>
    {chatRooms.map(chatRoom => {
      const isUserParticipating = isUserPresentInChatRoom(user, chatRoom);
      const textStyle = {
        style: {
          color: 'red'
        }
      };

      return (
        <ListItem
          key={chatRoom.id}
          avatar
          onPress={
            isUserParticipating
              ? () =>
                  navigation.navigate(SCREEN_CHAT, {
                    title: chatRoom.title,
                    user,
                    chatRoom
                  })
              : () =>
                  Alert.alert(
                    'Private chat room',
                    'You are not a part of this chat room. Do you want to send a request to join?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel'
                      },
                      {
                        text: 'OK',
                        onPress: () => onSendRequest(user, chatRoom)
                      }
                    ],
                    { cancelable: false }
                  )
          }
        >
          <Left>
            <Thumbnail
              source={{ uri: chatRoom.creator.avatar }}
              style={{ width: 40, height: 40 }}
            />
          </Left>
          <Body>
            <Text {...(!isUserParticipating ? textStyle : {})}>
              {chatRoom.title}
            </Text>
            <Text note {...(!isUserParticipating ? textStyle : {})}>
              {isUserParticipating
                ? (chatRoom.lastMessage && chatRoom.lastMessage.text) || ''
                : LOCKED_MESSAGE}
            </Text>
          </Body>
          <Right>
            <Text note {...(!isUserParticipating ? textStyle : {})}>
              {isUserParticipating
                ? (chatRoom.lastMessage &&
                    chatRoom.lastMessage.createdAt.toLocaleString()) ||
                  ''
                : LOCKED_MESSAGE}
            </Text>
          </Right>
        </ListItem>
      );
    })}
  </List>
);

const NewChatRoomDialog = ({ visible, setVisible, onCreateChatRoom }) => {
  const [input, setInput] = useState('');
  const onCancel = () => setVisible(false);
  const onCreate = () => {
    onCreateChatRoom(input);
    setVisible(false);
  };
  return (
    <Dialog.Container visible={visible} onBackdropPress={onCancel}>
      <Dialog.Title>Enter title</Dialog.Title>
      <Dialog.Input
        autoFocus
        placeholder="Title"
        onChangeText={text => setInput(text)}
      />
      <Dialog.Button label="Cancel" onPress={onCancel} />
      <Dialog.Button label="OK" onPress={onCreate} />
    </Dialog.Container>
  );
};

const ChatRoomsScreen = ({ navigation, user }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNewChatRoomCreated, setIsNewChatRoomCreated] = useState(true);

  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    WebSocketClient.onFetchedChatRooms = chatRooms => {
      console.log('Received chat rooms from server:');
      console.log(chatRooms);
      setChatRooms(chatRooms.reverse());
      setIsLoaded(true);
      setIsNewChatRoomCreated(true);
    };
  }, []);

  const [visibleDialog, setVisibleDialog] = useState(false);

  const onNewChatRoomPress = () => setVisibleDialog(true);
  const createNewChatRoom = title => {
    setIsNewChatRoomCreated(false);
    console.log(`Calling server to create new chat room with title ${title}`);
    WebSocketClient.createChatRoom(title);
  };

  const onSendRequest = (user, chatRoom) => {
    console.log(
      `Sending request from ${user.name} to chatRoom ${chatRoom.title}`
    );
  };

  if (!isLoaded || !isNewChatRoomCreated) {
    return (
      <Container>
        <Header>
          <Left>
            <Thumbnail
              source={{ uri: user.avatar }}
              style={{ width: 25, height: 25 }}
            />
          </Left>
          <Body>
            <Title>Chat Rooms</Title>
          </Body>
          <Right>
            <Button disabled hasText transparent onPress={onNewChatRoomPress}>
              <Text>New</Text>
            </Button>
          </Right>
        </Header>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Header>
          <Left>
            <Thumbnail
              source={{ uri: user.avatar }}
              style={{ width: 25, height: 25 }}
            />
          </Left>
          <Body>
            <Title>Chat Rooms</Title>
          </Body>
          <Right>
            <Button hasText transparent onPress={onNewChatRoomPress}>
              <Text>New</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <ChatRooms
            chatRooms={chatRooms}
            navigation={navigation}
            user={user}
            onSendRequest={onSendRequest}
          />
        </Content>
      </Container>
      <NewChatRoomDialog
        visible={visibleDialog}
        setVisible={setVisibleDialog}
        onCreateChatRoom={createNewChatRoom}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ChatRoomsScreen;
