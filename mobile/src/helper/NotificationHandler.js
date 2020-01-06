import { showMessage } from 'react-native-flash-message';

class NotificationHandler {
  showReconnect() {
    showMessage({
      message: 'Lost connection',
      description: 'Trying to reconnect',
      type: 'warning'
    });
  }

  showNewRequest() {
    showMessage({
      message: 'New request',
      description: 'Someone sent you a new request!',
      type: 'info'
    });
  }

  showClosedConnection() {
    showMessage({
      message: 'Connection closed',
      description: 'Will try to reconnect when possible',
      type: 'danger'
    });
  }

  showRequestSent() {
    showMessage({
      message: 'Request sent!',
      type: 'success'
    });
  }

  showAcceptedRequest(chatRoom) {
    showMessage({
      message: `Request accepted`,
      description: `Chat room ${chatRoom.title} is now accessible`,
      type: 'success'
    });
  }
}

export default new NotificationHandler();
