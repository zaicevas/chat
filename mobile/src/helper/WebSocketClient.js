import { WebSocketRequest, WebSocketResponse } from '../constants';

class WebSocketClient {
  // onFetchedChatRooms -> ALL_CHAT_ROOMS
  constructor(url) {
    this.url = url;
  }

  log(requestType) {
    console.log(`Sent ${requestType} to the server`);
  }

  init(user) {
    this.user = user;
    this.client = new WebSocket(this.url);
    this.client.onmessage = this.onResponse;
    this.client.onerror = err =>
      console.log('Error while connecting to the server: ' + err);

    this.client.onopen = () => {
      this.sayHello(this.user);
      this.getChatRooms();
    };
  }

  send(req) {
    this.client.send(JSON.stringify(req));
  }

  sayHello() {
    const req = {
      requestType: WebSocketRequest.SAY_HELLO,
      user: this.user
    };
    this.client.send(JSON.stringify(req));
    this.log(WebSocketRequest.SAY_HELLO);
  }

  getChatRooms() {
    const req = {
      requestType: WebSocketRequest.GET_CHAT_ROOMS
    };
    this.send(req);
    this.log(WebSocketRequest.GET_CHAT_ROOMS);
  }

  createChatRoom(title) {
    const req = {
      requestType: WebSocketRequest.CREATE_CHAT_ROOM,
      chatRoomTitle: title,
      user: this.user
    };
    this.send(req);
    this.log(WebSocketRequest.CREATE_CHAT_ROOM);
  }

  subscribeToChat(chatRoomId) {
    const req = {
      requestType: WebSocketRequest.SUBSCRIBE_TO_CHAT,
      user: this.user,
      chatRoomId
    };
    this.send(req);
    this.log(WebSocketRequest.SUBSCRIBE_TO_CHAT);
  }

  unsubscribeToChat() {
    const req = {
      requestType: WebSocketRequest.UNSUBSCRIBE_TO_CHAT,
      user: this.user
    };
    this.send(req);
    this.log(WebSocketRequest.UNSUBSCRIBE_TO_CHAT);
  }

  getChat(chatRoomId) {
    const req = {
      requestType: WebSocketRequest.GET_CHAT,
      chatRoomId
    };
    this.send(req);
    this.log(WebSocketRequest.GET_CHAT);
  }

  postNewMessage(message, chatRoomId) {
    const { _id, ...messageWithoutId } = message;
    const req = {
      requestType: WebSocketRequest.POST_NEW_MESSAGE,
      chatRoomId,
      message: messageWithoutId
    };
    console.log(req);
    this.send(req);
    this.log(WebSocketRequest.POST_NEW_MESSAGE);
  }

  onResponse = response => {
    const data = JSON.parse(response.data);
    console.log('Received from the server: ');
    console.log(response.data);
    switch (data.responseType) {
      case WebSocketResponse.ALL_CHAT_ROOMS:
        this.onFetchedChatRooms(data.chatRooms);
        break;
      case WebSocketResponse.ALL_CHAT:
        this.onFetchedChat(data.messages);
        break;
      case WebSocketResponse.UPDATE_CHAT:
        this.onUpdatedChat(data.message);
        break;
      case WebSocketResponse.NEW_ACCEPTED_REQUEST:
        this.onFetchedChatRooms(data.chatRooms);
        break;
      default:
        break;
    }
  };
}

const client = new WebSocketClient('ws://192.168.1.8:8080/chat');

export default client;
