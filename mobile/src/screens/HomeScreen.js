import * as Google from 'expo-google-app-auth';
import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';
import { toGiftedChatUser } from '../helper/Parse';
import WebSocketClient from '../helper/WebSocketClient';
import ChatRoomsScreen from './ChatRoomsScreen';

const HomeScreen = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const login = async () => {
    try {
      const result = await Google.logInAsync({
        scopes: ['profile', 'email'],
        iosClientId:
          '1019525006370-lp164cf6hikrcjq6rj1kb5acrm8neq4k.apps.googleusercontent.com',
        androidClientId:
          '1019525006370-gn86jfn92alo8u4kufj58uchfm9mbupj.apps.googleusercontent.com'
      });

      if (result.type === 'success') {
        const parsedUser = toGiftedChatUser(result.user);
        console.log('PARSED USER:');
        console.log(parsedUser);
        setIsLoggedIn(true);
        setUser(parsedUser);
        WebSocketClient.init(parsedUser);
      } else {
        console.log('cancelled');
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Button title="Login with Google" onPress={login} />
      </View>
    );
  }
  return <ChatRoomsScreen user={user} navigation={navigation} />;
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
