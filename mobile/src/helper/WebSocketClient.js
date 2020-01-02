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
      requestType: 'SAY_HELLO',
      user: this.user
    };
    this.client.send(JSON.stringify(req));
    this.log('SAY_HELLO');
  }

  getChatRooms() {
    const req = {
      requestType: 'GET_CHAT_ROOMS'
    };
    this.send(req);
    this.log('GET_CHAT_ROOMS');
  }

  createChatRoom(title) {
    const req = {
      requestType: 'CREATE_CHAT_ROOM',
      chatRoomTitle: title,
      user: this.user
    };
    this.send(req);
    this.log('CREATE_CHAT_ROOM');
  }

  onResponse = response => {
    const data = JSON.parse(response.data);
    console.log('Received from the server: ');
    console.log(response.data);
    if (data.responseType === 'ALL_CHAT_ROOMS') {
      this.onFetchedChatRooms(data.chatRooms);
    }
  };
}

const client = new WebSocketClient('ws://192.168.1.8:8080/chat');

export default client;
