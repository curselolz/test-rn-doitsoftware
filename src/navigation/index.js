import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../container/Home/Feed';
import Details from '../container/Home/Details';
import DetailsShow from '../container/Home/DetailsShow';
import Auth from '../container/Auth';
import {NewButton, IconEdit} from '../utils/navTabBarBtn';

const AppNavigator = createStackNavigator({
  SignIn: {
    screen: Auth,
    navigationOptions: {
      headerShown: false,
    },
  },
  Register: {
    screen: Auth,
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'My tasks',
      headerRight: () => <NewButton />,
    },
  },
  Details: {
    screen: Details,
    navigationOptions: {
      title: 'Add new Task',
    },
  },
  DetailsShow: {
    screen: DetailsShow,
    navigationOptions: {
      title: 'Detail task',
      headerRight: () => <IconEdit />,
    },
  },
});

export default createAppContainer(AppNavigator);
