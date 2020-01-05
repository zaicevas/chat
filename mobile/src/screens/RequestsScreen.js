import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import {
  Body,
  Container,
  Header,
  Left,
  ListItem,
  Text,
  Thumbnail,
  Title
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SwipeListView } from 'react-native-swipe-list-view';
import WebSocketClient from '../helper/WebSocketClient';

const renderItem = request => {
  return (
    <ListItem key={request.id} avatar>
      <Left>
        <Thumbnail
          source={{ uri: request.user.avatar }}
          style={{ width: 40, height: 40 }}
        />
      </Left>
      <Body>
        <Text>{request.chatRoom.title}</Text>
        <Text note>{request.user.name}</Text>
      </Body>
    </ListItem>
  );
};

const renderHiddenItem = (onAccept, onDecline) => {
  return (
    <View style={styles.rowBack}>
      <View style={styles.leftButton}>
        <TouchableOpacity onPress={onAccept}>
          <AntDesign name="upcircleo" size={24} color={'#ffffff'} />
        </TouchableOpacity>
      </View>
      <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
        <TouchableOpacity onPress={onDecline}>
          <MaterialIcons name="cancel" size={24} color={'#ffffff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RequestsScreen = ({ navigation }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    WebSocketClient.onFetchedChatRoomRequests = chatRoomRequests => {
      const requestsWithStringId = chatRoomRequests.map(req => ({
        ...req,
        id: req.id.toString()
      }));
      setRequests(requestsWithStringId);
    };
    WebSocketClient.getChatRoomRequests();
  }, []);

  const onAccept = chatRoomRequest => {
    WebSocketClient.acceptRequest(chatRoomRequest);
  };

  const onDecline = chatRoomRequest => {
    WebSocketClient.declineRequest(chatRoomRequest);
  };

  return (
    <Container>
      <Header>
        <Body>
          <Title>Requests</Title>
        </Body>
      </Header>
      <SwipeListView
        data={requests}
        renderItem={data => (
          <View style={styles.rowFront}>{renderItem(data.item)}</View>
        )}
        renderHiddenItem={data =>
          renderHiddenItem(
            () => onAccept(data.item),
            () => onDecline(data.item)
          )
        }
        leftOpenValue={75}
        rightOpenValue={-75}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 50
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#8BC645',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  backTextWhite: {
    color: '#FFF'
  },
  rowFront: {
    backgroundColor: '#ffffff',
    justifyContent: 'center'
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15
  },
  leftButton: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    top: 0,
    position: 'absolute',
    width: 75,
    backgroundColor: 'green'
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    backgroundColor: 'white'
  },
  backRightBtnLeft: {
    backgroundColor: 'red',
    right: 0,
    width: 75
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0
  },
  controls: {
    alignItems: 'center',
    marginBottom: 30
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5
  },
  switch: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10
  },
  trash: {
    height: 25,
    width: 25
  }
});

export default RequestsScreen;
