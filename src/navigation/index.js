import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../container/Home/Feed';
import Details from '../container/Home/Details';
import Auth from '../container/Auth';

const AppNavigator = createStackNavigator({
  SignIn: {
    screen: Auth,
    navigationOptions:{ headerShown: false }
  },
  Register: {
    screen: Auth,
  },
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: Details,
  },
});

export default createAppContainer(AppNavigator);

