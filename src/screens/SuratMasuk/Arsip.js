/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  FlatList,
  ToastAndroid,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GLOBAL} from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../partials/Header';
import axios from 'axios';
import {constants} from '../../config/config';
import useAuth from '../../hook/useAuth';
import {StackActions} from '@react-navigation/native';

const SuratMasukArsipScreen = ({navigation}) => {
  const [arsipData, setArsipData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const {auth} = useAuth();

  const getArsip = () => {
    axios
      .get(`${constants.backend_url}/suratmasuk/arsip/${auth.nip}`)
      .then(response => {
        if (response.data.status === 1) {
          setArsipData(response.data.data);
        } else {
          console.log(response.data.message);
          ToastAndroid.showWithGravity(
            'Arsip Gagal Dimuat !!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.showWithGravity(
          'Arsip Gagal Dimuat !!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      });
  };

  useEffect(() => {
    getArsip();
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
          List Arsip Anda
        </Text>
      </View>
      <FlatList
        style={styles.listWrapper}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              getArsip();
              setRefresh(false);
            }}
          />
        }
        data={arsipData}
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
                  Di Arsipkan Pada : {item.tanggal_arsip.split('T')[0]}
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

export default SuratMasukArsipScreen;

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
