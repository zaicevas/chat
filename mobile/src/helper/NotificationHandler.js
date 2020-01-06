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
      description: 'Someone has sent you a new request!',
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

  showFailedGoogleAuth() {
    showMessage({
      message: `Failed`,
      description: `Failed to authenticate. Please try again`,
      type: 'danger'
    });
  }

  showLogout() {
    showMessage({
      message: `Logout successful`,
      type: 'success'
    });
  }
}

export default new NotificationHandler();
