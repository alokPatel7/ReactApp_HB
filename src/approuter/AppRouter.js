import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HbSplashScreen from '../screens/landing/HbSplashScreen';
import HbSignup from '../screens/auth/HbSignup';
import HbVerify from '../screens/auth/HbVerify';
import HbLogin from '../screens/auth/Hblogin';
import HbDashboard from '../screens/components/HbDashboard';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HbForm from '../screens/components/Hb-Form';
import firestore from '@react-native-firebase/firestore';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedUser: false,
    };
  }
  componentDidMount() {
    const usersCollection = firestore().collection('Users');
  }
  render() {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="splashscreen">
            <Stack.Screen
              name="splashscreen"
              component={HbSplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="signup"
              component={HbSignup}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="login"
              component={HbLogin}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="password"
              component={HbVerify}
              options={{headerShown: false}}
            />
            <Drawer.Screen
              name="dashboard"
              component={HbDashboard}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="additem"
              component={HbForm}
              options={{headerShown: true, title: 'Add Item'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}

export default AppRouter;
