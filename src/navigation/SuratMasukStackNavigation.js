import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SuratMasukScreen from '../screens/SuratMasuk/SuratMasuk';
import SuratMasukDetailScreen from '../screens/SuratMasuk/SuratMasukDetail';
import SuratMasukHistoryScreen from '../screens/SuratMasuk/History';
import SuratMasukArsipScreen from '../screens/SuratMasuk/Arsip';
import ListSuratMasukScreen from '../screens/SuratMasuk/ListSuratMasuk';
import ArsipDetailScreen from '../screens/SuratMasuk/ArsipDetail';
import DisposisiScreen from '../screens/SuratMasuk/Disposisi';
import DisposisiProses from '../screens/fragments/DisposisiProses';
import DisposisiSelesaiScreen from '../screens/SuratMasuk/DisposisiSelesai';
import DisposisiProsesScreen from '../screens/SuratMasuk/DisposisiProses';

const Stack = createNativeStackNavigator();

const ListSuratStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ListSuratMasukScreen"
        component={ListSuratMasukScreen}
      />
    </Stack.Navigator>
  );
};

const SuratMasukStackNavigation = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="SuratMasukRoot">
      <Stack.Screen
        name="SuratMasukRoot"
        component={SuratMasukScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuratMasukDetail"
        component={SuratMasukDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuratMasukHistory"
        component={SuratMasukHistoryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuratMasukArsip"
        component={SuratMasukArsipScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListSuratMasukStack"
        component={ListSuratStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Disposisi"
        component={DisposisiScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="DisposisiProses"
        component={DisposisiProsesScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="DisposisiSelesai"
        component={DisposisiSelesaiScreen}
      />
      <Stack.Screen
        name="ArsipDetail"
        component={ArsipDetailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SuratMasukStackNavigation;
