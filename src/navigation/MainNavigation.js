import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackNavigation from './HomeStackNavigation';
import SuratMasukStackNavigation from './SuratMasukStackNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {GLOBAL} from '../styles/globalStyles';
import Account from '../screens/Account/Account';
import NotificationStackNavigation from './NotificationStackNavigation';

const Tab = createBottomTabNavigator();

const MainNavigation = ({navigation}) => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        // flex: 1,
        elevation: 5,
        borderTopStartRadius: 20,
        backgroundColor: GLOBAL.color.titleBase,
      }}
      initialRouteName="HomeStack">
      <Tab.Screen
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: props => <Icon name="home-outline" size={28} />,
        }}
        name="HomeStack"
        component={HomeStackNavigation}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          title: 'Surat Masuk',
          tabBarIcon: props => <Icon name="mail-outline" size={28} />,
        }}
        name="SuratMasukStack"
        component={SuratMasukStackNavigation}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          title: 'Notification Center',
          tabBarIcon: props => <Icon name="notifications-outline" size={28} />,
        }}
        name="NotificationStack"
        component={NotificationStackNavigation}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          title: 'Settings',
          tabBarIcon: props => <Icon name="cog-outline" size={28} />,
        }}
        name="Account"
        component={Account}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
