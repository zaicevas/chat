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
    this.client.send(JSON.stringify(req));
    this.log('GET_CHAT_ROOMS');
  }

  onResponse = response => {
    const data = JSON.parse(response.data);
    if (data.responseType === 'ALL_CHAT_ROOMS') {
      this.onFetchedChatRooms(data.chatRooms);
    }
  };
}

const client = new WebSocketClient('ws://192.168.1.8:8080/chat');

export default client;
