/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ToastAndroid,
  TextInput,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {GLOBAL} from '../../styles/globalStyles';
import {constants} from '../../config/config';
import * as Keychain from 'react-native-keychain';
// import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';

const Login = ({navigation}) => {
  const [nip, setNip] = useState('');
  const [password, setPassword] = useState('');
  //   const server = DeviceInfo.getBundleId();

  const storeSession = async value => {
    try {
      await AsyncStorage.setItem('@credential', value);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = async () => {
    await axios
      .post(constants.backend_url + '/users/auth/login', {
        nip: nip,
        password: password,
      })
      .then(response => {
        if (response.data.status === 1) {
          console.log(response.data.data);
          if (response.data.data.length > 0) {
            AsyncStorage.setItem(
              'credential',
              JSON.stringify(response.data.data[0]),
            );
            navigation.dispatch(StackActions.replace('AuthWelcome'));
            ToastAndroid.showWithGravity(
              'Berhasil Login, Selamat Datang ' + response.data.data[0].nama,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          } else {
            console.log(response.data.message);
            ToastAndroid.showWithGravity(
              'Gagal Login, Cek Kembali Username dan Password Anda !!',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          }
        } else {
          console.log(response.data.message);
          ToastAndroid.showWithGravity(
            'Gagal Login ' + response.data.message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.showWithGravity(
          'Gagal Login ' + error,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: GLOBAL.color.screenContainer,
        justifyContent: 'center',
        alignContent: 'center',
        // alignItems: 'center',
      }}>
      <View
        style={{
          padding: 1,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: GLOBAL.font.Anton,
            color: GLOBAL.color.titleBase,
            fontSize: 24,
            // fontWeight: 'bold',
          }}>
          Disposisi Mobile Apps
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: 120,
            height: 150,
            // marginTop: 120,
            marginTop: 50,
            marginBottom: 50,
          }}
          source={require('../../assets/images/RAJA-AMPAT-NEW-LOGO.png')}
        />
      </View>
      <View
        style={{
          //   flex: 4,
          alignItems: 'center',

          backgroundColor: GLOBAL.color.titleBase,
          padding: 10,
          marginLeft: 35,
          marginRight: 35,
          //   width: '50%',
          borderTopStartRadius: 100,
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
          borderTopEndRadius: 100,
          elevation: 4,
        }}>
        <Text
          style={{
            fontFamily: GLOBAL.font.PathWayGothicOne,
            color: GLOBAL.color.screenContainer,
            fontSize: 24,
          }}>
          Application Sign In Screen
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          //   margin: 10,
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: GLOBAL.color.screenBox,
            elevation: 5,
            padding: 20,
            // margin: 5,
            width: '80%',
            maxHeight: 190,
            // borderTopStartRadius: 50,
            borderBottomEndRadius: 50,
            borderBottomStartRadius: 50,
          }}>
          <TextInput
            onChangeText={value => setNip(value)}
            style={styles.inputBox}
            placeholder="Type Your NIP"
          />
          <TextInput
            secureTextEntry
            onChangeText={value => setPassword(value)}
            style={styles.inputBox}
            placeholder="Type Your Password"
          />
          <TouchableOpacity onPress={handleLogin} style={styles.SignButton}>
            <Text
              style={{
                color: GLOBAL.color.screenContainer,
                fontSize: 18,
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 1,
    borderColor: GLOBAL.color.titleBase,
    borderStyle: 'solid',
    padding: 10,
    borderRadius: 50,
    color: GLOBAL.color.titleBase,
    margin: 10,
    fontSize: 15,
  },
  SignButton: {
    backgroundColor: GLOBAL.color.titleBase,
    padding: 10,
    borderTopStartRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    borderTopEndRadius: 20,
    elevation: 4,
    alignItems: 'center',
    margin: 10,
  },
});
