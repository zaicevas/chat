import * as Google from 'expo-google-app-auth';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { googleConfig } from '../constants/Auth';
import Colors from '../constants/Colors';
import { SCREEN_CHAT_ROOMS } from '../constants/Screens';
import NotificationHandler from '../helper/NotificationHandler';
import { toGiftedChatUser } from '../helper/Parse';
import WebSocketClient from '../helper/WebSocketClient';

const HomeScreen = ({ navigation }) => {
  const login = async () => {
    try {
      const result = await Google.logInAsync(googleConfig);

      if (result.type === 'success') {
        const parsedUser = toGiftedChatUser(result.user);
        WebSocketClient.init(parsedUser);
        navigation.navigate(SCREEN_CHAT_ROOMS, {
          user: parsedUser,
          accessToken: result.accessToken
        });
      } else {
        NotificationHandler.showFailedGoogleAuth();
        console.log('cancelled');
      }
    } catch (e) {
      NotificationHandler.showFailedGoogleAuth();
      console.log('error', e);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Login with Google" onPress={login} />
    </View>
  );
};

HomeScreen.navigationOptions = () => ({
  header: null
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default HomeScreen;
