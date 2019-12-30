import React from 'react';
import {
 Image, StyleSheet, Text, View 
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const SystemMessage = ({ currentMessage }) => (
  <View style={styles.container}>
    <View style={styles.message}>
      <Image
        style={styles.avatar}
        source={{ uri: currentMessage.user.avatar }}
      />
      <Text style={styles.text}>{currentMessage.text}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 5,
    marginBottom: 10,
  },
  text: {
    backgroundColor: Colors.backgroundTransparent,
    color: Colors.defaultColor,
    fontSize: 12,
    fontWeight: '300',
    paddingTop: 12,
    paddingLeft: 10,
  },
  message: {
    flexDirection: 'row',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
});

export default SystemMessage;
