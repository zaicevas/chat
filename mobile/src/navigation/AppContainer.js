import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Screens } from '../constants';
import { SCREEN_CHAT } from '../constants/Screens';
import ChatRoomsScreen from '../screens/ChatRoomsScreen';
import ChatScreen from '../screens/ChatScreen';
import HomeScreen from '../screens/HomeScreen';
import RequestsScreen from '../screens/RequestsScreen';

const HomeStackNavigator = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    initialRouteName: Screens.SCREEN_HOME
  }
);

const ChatRoomsStack = createStackNavigator({
  ChatRooms: {
    screen: ChatRoomsScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  Chat: {
    screen: ChatScreen
  }
});

ChatRoomsStack.navigationOptions = ({ navigation }) => {
  const tabBarVisible =
    navigation.state.routes[navigation.state.routes.length - 1].routeName !==
    SCREEN_CHAT;

  return {
    tabBarVisible,
    tabBarIcon: ({ tintColor }) => (
      <Ionicons name="ios-chatbubbles" size={24} color={tintColor} />
    )
  };
};

const BottomNavigator = createMaterialBottomTabNavigator(
  {
    ChatRoomsStack,
    Requests: {
      screen: RequestsScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="cloud-question"
            size={24}
            color={tintColor}
          />
        )
      })
    }
  },
  {
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    labeled: false,
    barStyle: { backgroundColor: '#694fad' }
  }
);

const SwitchNavigator = createSwitchNavigator(
  {
    Home: HomeStackNavigator,
    Bottom: BottomNavigator
  },
  {
    initialRouteName: Screens.SCREEN_HOME
  }
);

export default createAppContainer(SwitchNavigator);
