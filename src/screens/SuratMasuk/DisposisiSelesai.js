/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {constants} from '../../config/config';
import useAuth from '../../hook/useAuth';
import axios from 'axios';
import {GLOBAL} from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../partials/Header';
import {StackActions} from '@react-navigation/native';

const DisposisiSelesaiScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const {auth} = useAuth();

  const getDisposisi = () => {
    axios
      .get(constants.backend_url + '/suratmasuk/disposisi-selesai', {
        params: {
          disposision_level: auth.disposision_level,
        },
      })
      .then(response => {
        if (response.data.status === 1) {
          setData(response.data.data);
          if (response.data.data.length < 1) {
            ToastAndroid.showWithGravity(
              'Belum Ada Data',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          }
        } else {
          console.log(response.data.message);
          ToastAndroid.showWithGravity(
            'Data Gagal Dimuat !!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.showWithGravity(
          'Data Gagal Dimuat !!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      });
  };

  useEffect(() => {
    getDisposisi();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: GLOBAL.color.screenContainer,
      }}>
      <Header />
      <View
        style={{
          marginLeft: 5,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.dispatch(StackActions.replace('SuratMasukRoot'))
          }>
          <Icon name="arrow-back" size={20} color={GLOBAL.color.titleBase} />
        </TouchableOpacity>
        <Text
          style={{
            color: GLOBAL.color.titleBase,
            marginLeft: 20,
          }}>
          List Disposisi Selesai Dari Anda
        </Text>
      </View>
      <FlatList
        style={styles.listWrapper}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              getDisposisi();
              setRefresh(false);
            }}
          />
        }
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(
                StackActions.push('ArsipDetail', {
                  filename: item.filename,
                }),
              )
            }
            style={styles.listItem}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name="document-text-outline"
                size={35}
                color={GLOBAL.color.titleBase}
              />
              <View
                style={{
                  marginLeft: 5,
                }}>
                <Text
                  style={{
                    color: GLOBAL.color.titleBase,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  {item.perihal_surat}
                </Text>
                <Text
                  style={{
                    color: 'gray',
                  }}>
                  Di Disposisikan Oleh Anda Sejak :{' '}
                  {item.created_time.split('T')[0]}
                </Text>
              </View>
            </View>
            <Icon
              name="arrow-forward"
              size={24}
              color={GLOBAL.color.titleBase}
            />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default DisposisiSelesaiScreen;

const styles = StyleSheet.create({
  listWrapper: {
    flex: 1,
    margrin: 5,
  },
  listItem: {
    padding: 10,
    backgroundColor: GLOBAL.color.screenBox,
    elevation: 5,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
