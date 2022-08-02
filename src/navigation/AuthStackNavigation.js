/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import DisposisiProses from '../screens/fragments/DisposisiProses';
import DisposisiSelesai from '../screens/fragments/DisposisiSelesai';
import SuratMasuk from '../screens/fragments/SuratMasuk';
import Login from '../screens/Auth/Login';
import AuthWelcome from '../screens/splash/AuthWelcome';
import HomeStackNavigation from './HomeStackNavigation';
import MainNavigation from './MainNavigation';

const Stack = createNativeStackNavigator();

const AuthStackNavigation = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthWelcome">
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="AuthWelcome"
          component={AuthWelcome}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Main"
          component={MainNavigation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStackNavigation;
