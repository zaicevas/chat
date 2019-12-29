import {
 Body, Container, Content, Header, Left, List, ListItem, Right, Text, Thumbnail, Title 
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { SCREEN_CHAT } from '../constants/Screens';

const INITIAL_CHAT_ROOMS = {
  id: 0,
  title: 'TITLE_CHAT_ROOM',
  latestMessage: 'LATEST_MESSAGE',
  latestMessageTime: '3:43 pm',
  createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
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

const ChatRoomsScreen = ({ navigation, user }) => {
  const [chatRooms, setChatRooms] = useState([]);
  useEffect(() => {
    console.log('Calling backend to fetch chat rooms');
  });
  return (
    <Container>
      <Header>
        <Body>
          <Title>Chat Rooms</Title>
        </Body>
      </Header>
      <Content>
        <ChatRooms chatRooms={[INITIAL_CHAT_ROOMS, INITIAL_CHAT_ROOMS]} navigation={navigation} user={user} />
      </Content>
    </Container>
  );
};

export default ChatRoomsScreen;
