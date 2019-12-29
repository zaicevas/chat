import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Screens } from '../constants';
import ChatRoomsScreen from '../screens/ChatRoomsScreen';
import ChatScreen from '../screens/ChatScreen';
import HomeScreen from '../screens/HomeScreen';

const HomeStackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Chat: ChatScreen,
  },
  {
    initialRouteName: Screens.SCREEN_HOME,
  },
);

const ChatRoomsStackNavigator = createStackNavigator(
  {
    ChatRooms: ChatRoomsScreen,
  },
  {
    initialRouteName: Screens.SCREEN_CHAT_ROOMS,
  },
);

const SwitchNavigator = createSwitchNavigator({
  Home: HomeStackNavigator,
  ChatRooms: ChatRoomsStackNavigator,
},
{
  initialRouteName: Screens.SCREEN_HOME,
});

export default createAppContainer(SwitchNavigator);
