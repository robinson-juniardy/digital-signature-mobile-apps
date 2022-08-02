/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, ToastAndroid, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import useAuth from '../../hook/useAuth';
import axios from 'axios';
import {constants} from '../../config/config';
import {RadioButton} from 'react-native-paper';
import {GLOBAL} from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackActions} from '@react-navigation/native';

const DisposisiScreen = ({route, navigation}) => {
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState(null);
  const {auth} = useAuth();

  const getUsers = () => {
    axios
      .get(constants.backend_url + '/users/list')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.showWithGravity(
          'Users Gagal Dimuat',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      });
  };

  const handleUpdateStatus = () => {
    axios
      .post(constants.backend_url + '/suratmasuk/proses', {
        status: 2,
        id_surat: route.params.id_surat,
        created_by: auth.nip,
      })
      .then(response => {
        if (response.data.status === 1) {
          ToastAndroid.showWithGravity(
            'Status Dokumen Berhasil Di Update',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        } else {
          console.log(response.data.message);
          ToastAndroid.showWithGravity(
            'Status Dokumen Gagal Di Update',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.showWithGravity(
          'Status Dokumen Gagal Di Update',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      });
  };

  const handleDisposisi = () => {
    axios
      .post(constants.backend_url + '/suratmasuk/disposisi', {
        idSurat: route.params.id_surat,
        disposisiUser: parseInt(value),
        role: auth.login_role,
        status: auth.disposision_level - 1,
        disposisiBy: auth.user_id,
      })
      .then(response => {
        if (response.data.status === 1) {
          ToastAndroid.showWithGravity(
            'Berhasil Disposisi',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          handleUpdateStatus();
          navigation.dispatch(StackActions.replace('ListSuratMasukStack'));
        } else {
          console.log(response.data.message);
          ToastAndroid.showWithGravity(
            'Gagal Disposisi',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.showWithGravity(
          'Gagal Disposisi',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View>
      <View
        style={{
          margin: 5,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'baseline',
          alignContent: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={18} color={GLOBAL.color.titleBase} />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 10,
            color: GLOBAL.color.titleBase,
            fontFamily: GLOBAL.font.Anton,
          }}>
          List Users Untuk Disposisi
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={handleDisposisi}
          style={{
            padding: 10,
            alignItems: 'center',
            margin: 1,
            elevation: 5,
            backgroundColor: GLOBAL.color.titleBase,
            borderRadius: 10,
          }}
          disabled={value === null && true}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
            }}>
            Disposisikan
          </Text>
        </TouchableOpacity>
      </View>
      <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
        {users.map((item, index) => {
          if (item.disposision_level === auth.disposision_level - 1) {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: GLOBAL.color.screenBox,
                  margin: 1,
                  elevation: 5,
                }}>
                <RadioButton.Item label={item.nama} value={item.id} />
              </View>
            );
          }
        })}
      </RadioButton.Group>
    </View>
  );
};

export default DisposisiScreen;
