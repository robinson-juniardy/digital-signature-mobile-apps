/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NotificationScreen from '../screens/Notifications/NotificationScreen';
import NotificationDetail from '../screens/Notifications/NotificationDetail';

const Stack = createNativeStackNavigator();

const NotificationStackNavigation = ({route, navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Notification">
      <Stack.Screen
        options={{headerShown: false}}
        name="Notification"
        component={NotificationScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="NotificationDetail"
        component={NotificationDetail}
      />
    </Stack.Navigator>
  );
};

export default NotificationStackNavigation;
