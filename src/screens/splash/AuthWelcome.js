/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
// import * as Keychain from 'react-native-keychain';
// import DeviceInfo from 'react-native-device-info';
import {StackActions} from '@react-navigation/native';
import useStorage from '../../hook/useStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../../hook/useAuth';

const AuthWelcome = ({navigation}) => {
  const [animate, setAnimate] = useState(true);
  const {setAuth} = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setAnimate(false);
      const credential = async () => {
        await AsyncStorage.getItem('credential')
          .then(value => {
            const users = JSON.parse(value);
            if (value !== null) {
              setAuth({
                disposision_level: users.disposision_level,
                role_name: users.role_name,
                login_role: users.role,
                nama: users.nama,
                user_id: users.id,
                nip: users.nip,
              });
              navigation.dispatch(StackActions.replace('Main'));
            } else {
              navigation.dispatch(StackActions.replace('Login'));
            }

            return JSON.parse(value);
          })
          .catch(error => {
            setAuth(null);
            navigation.dispatch(StackActions.replace('Login'));
            return null;
          });
      };

      credential();
    }, 3000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator animating={animate} size={50} />
      <Text>Please Wait...</Text>
    </View>
  );
};

export default AuthWelcome;
