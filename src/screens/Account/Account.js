import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {StackActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GLOBAL} from '../../styles/globalStyles';
import Header from '../../partials/Header';
import useAuth from '../../hook/useAuth';

const Account = ({navigation}) => {
  const {setAuth} = useAuth();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: GLOBAL.color.screenContainer,
      }}>
      <Header />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: GLOBAL.color.screenBox,
            borderRadius: 10,
            padding: 10,
            elevation: 5,
          }}
          onPress={() => {
            AsyncStorage.clear().then(() => {
              navigation.dispatch(StackActions.replace('AuthWelcome'));
            });
          }}>
          <Icon size={50} name="power-outline" color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Account;
