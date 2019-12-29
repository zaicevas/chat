import {
 Body, Button, Container, Content, Header, Left, List, ListItem, Right, Text, Thumbnail, Title 
} from 'native-base';
import React, { useEffect, useState } from 'react';
import Dialog from 'react-native-dialog';
import { SCREEN_CHAT } from '../constants/Screens';

const INITIAL_CHAT_ROOM = {
  id: 0,
  title: 'TITLE_CHAT_ROOM',
  latestMessage: 'LATEST_MESSAGE',
  latestMessageTime: '3:43 pm',
  createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
  participants: [],
  creator: {
    id: 0,
    name: 'Tomas Zaicevas',
    givenName: 'Tomas',
    familyName: 'Zaicevas',
    email: 'tozaicevas@gmail.com',
    photoUrl: 'https://lh3.googleusercontent.com/a-/AAuE7mCGuhnSeQ0XrJ2n2RIo4OgFiRBNgcSfO0bq31s-',
  },
};

const ChatRooms = ({ chatRooms, navigation, user }) => (
  <List>
    {chatRooms.map((chatRoom) => (
      <ListItem key={chatRoom.id} avatar onPress={() => navigation.navigate(SCREEN_CHAT, { title: chatRoom.title, user })}>
        <Left>
          <Thumbnail source={{ uri: chatRoom.creator.photoUrl }} style={{ width: 40, height: 40 }} />
        </Left>
        <Body>
          <Text>{chatRoom.title}</Text>
          <Text note>{chatRoom.latestMessage}</Text>
        </Body>
        <Right>
          <Text note>{chatRoom.latestMessageTime}</Text>
        </Right>
      </ListItem>
    ))}
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
      <Dialog.Input autoFocus placeholder="Title" onChangeText={(text) => setInput(text)} />
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
    console.log('Calling backend to fetch chat rooms');
    const fetchedChatRooms = [INITIAL_CHAT_ROOM];
    setChatRooms(fetchedChatRooms);
    setIsLoaded(true);
  }, []);

  const [visibleDialog, setVisibleDialog] = useState(false);

  const onNewChatRoomPress = () => setVisibleDialog(true);
  const createNewChatRoom = async (title) => {
    setIsNewChatRoomCreated(false);
    console.log(`Calling backend to create new chat room with title ${title} .AWAIT`);
    const newChatRoom = INITIAL_CHAT_ROOM;
    setChatRooms([...chatRooms, newChatRoom]);
    setIsNewChatRoomCreated(true);
  };

  return (
    <>
      <Container>
        <Header>
          <Left>
            <Thumbnail source={{ uri: user.photoUrl }} style={{ width: 25, height: 25 }} />
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
          <ChatRooms chatRooms={chatRooms} navigation={navigation} user={user} />
        </Content>
      </Container>
      <NewChatRoomDialog visible={visibleDialog} setVisible={setVisibleDialog} onCreateChatRoom={createNewChatRoom} />
    </>
  );
};

export default ChatRoomsScreen;
