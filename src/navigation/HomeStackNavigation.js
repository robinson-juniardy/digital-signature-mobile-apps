/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import DisposisiProses from '../screens/fragments/DisposisiProses';
import DisposisiSelesai from '../screens/fragments/DisposisiSelesai';
import SuratMasuk from '../screens/fragments/SuratMasuk';
import DisposisiSelesaiScreen from '../screens/SuratMasuk/DisposisiSelesai';
import DisposisiProsesScreen from '../screens/SuratMasuk/DisposisiProses';

const Stack = createNativeStackNavigator();

const HomeStackNavigation = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SuratMasuk"
        component={SuratMasuk}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;
