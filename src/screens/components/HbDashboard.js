import {Text, View} from 'react-native';
import React, {Component} from 'react';
import {createDrawerNavigator, DrawerContent} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setConnectionWithFirebase} from '../../services/firebaseCRUD';

import Expenses from './TabScreen/Expenses';
import PersonalExpenses from './TabScreen/PersonalExpenses';
import SharedExpenses from './TabScreen/SharedExpenses';
import UserProfile from './Hb-user/profile';
import HbDrawerContent from './Hb-DrawerContent';

const ExpensesStack = createDrawerNavigator();
// const PesonalStack = createDrawerNavigator();
// const ExpensesStack = createDrawerNavigator();
// const profileStack = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

class HbDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // await setConnectionWithFirebase()
    //   .then((res) => {
    //     console.log('setConnectionWithFirebase', res);
    //   })
    //   .catch((err) => {
    //     console.log('setConnectionWithFirebase', err);
    //   });
  }
  render() {
    return (
      <>
        <Tab.Navigator
          initialRouteName="ExpensesTab"
          barStyle={{backgroundColor: '#000'}}>
          <Tab.Screen
            name="ExpensesTab"
            component={ExpensesTab}
            options={{
              tabBarLabel: 'Expenses',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="PersonalExpensesTab"
            component={PersonalExpensesTab}
            options={{
              tabBarLabel: 'Personal',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="book" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="SharedExpensesTab"
            component={SharedExpensesTab}
            options={{
              tabBarLabel: 'Shared',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="book" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="profile"
            component={ProfileTab}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </>
    );
  }
}

export default HbDashboard;

const ExpensesTab = ({navigation}) => (
  <ExpensesStack.Navigator
    openByDefault={false}
    drawerContent={(props) => <HbDrawerContent {...props} />}>
    <ExpensesStack.Screen
      name="ExpensesTab"
      component={Expenses}
      options={{title: 'Expenses', headerShown: true}}
    />
  </ExpensesStack.Navigator>
);
const PersonalExpensesTab = ({navigation}) => (
  <ExpensesStack.Navigator
    drawerContent={(props) => <HbDrawerContent {...props} />}>
    <ExpensesStack.Screen
      name="ExpensesTab"
      component={PersonalExpenses}
      options={{title: 'Personal Expenses', headerShown: true}}
    />
  </ExpensesStack.Navigator>
);
const SharedExpensesTab = ({navigation}) => (
  <ExpensesStack.Navigator
    drawerContent={(props) => <HbDrawerContent {...props} />}>
    <ExpensesStack.Screen
      name="SharedExpensesTab"
      component={SharedExpenses}
      options={{title: 'Shared Expenses', headerShown: true}}
    />
  </ExpensesStack.Navigator>
);
const ProfileTab = ({navigation}) => (
  <ExpensesStack.Navigator
    drawerContent={(props) => <HbDrawerContent {...props} />}>
    <ExpensesStack.Screen
      name="profile"
      component={UserProfile}
      options={{title: 'User Name', headerShown: true}}
    />
  </ExpensesStack.Navigator>
);
