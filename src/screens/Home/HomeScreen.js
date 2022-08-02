/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GLOBAL} from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Octicons';
import useStorage from '../../hook/useStorage';
import useAuth from '../../hook/useAuth';
import Header from '../../partials/Header';
import axios from 'axios';
import {constants} from '../../config/config';

const HomeScreen = React.memo(({navigation}) => {
  const [storage, setStorage] = useState(null);
  const [suratmasuk, setsuratmasuk] = useState([]);
  const [disposisiProses, setDisposisiProses] = useState([]);
  const [disposisiSelesai, setDisposisiSelesai] = useState([]);
  const {auth} = useAuth();

  const getDisposisiSelesai = () => {
    axios
      .get(constants.backend_url + '/suratmasuk/disposisi-selesai', {
        params: {
          disposision_level: auth.disposision_level,
        },
      })
      .then(response => {
        if (response.data.status === 1) {
          setDisposisiSelesai(response.data.data);
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

  const getDisposisiProses = () => {
    axios
      .get(constants.backend_url + '/suratmasuk/disposisi-proses', {
        params: {
          disposision_level: auth.disposision_level,
        },
      })
      .then(response => {
        if (response.data.status === 1) {
          setDisposisiProses(response.data.data);
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
  const getSuratMasuk = () => {
    axios
      .get(
        auth.login_role === 'ka_opd'
          ? constants.backend_url + '/suratmasuk'
          : constants.backend_url + `/suratmasuk/disposisi/${auth.user_id}`,
      )
      .then(response => {
        if (response.data.status === 1) {
          setsuratmasuk(response.data.data);
        } else {
          console.log(response.data.message);
          ToastAndroid.showWithGravity(
            'Gagal Mengambil Data Dari Server',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.showWithGravity(
          'Gagal Mengambil Data Dari Server',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      getSuratMasuk();
      getDisposisiProses();
      getDisposisiSelesai();
    }, 5000);

    return () => clearInterval(interval);
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
          flex: 1,
          marginTop: 15,
        }}>
        <View style={styles.uiBox}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignContent: 'center',
              marginBottom: 2,
            }}>
            <Icon name="pin" color={GLOBAL.color.titleBase} size={24} />
            <Text
              style={{
                fontFamily: GLOBAL.font.Anton,
                fontSize: 18,
                lineHeight: 23,
                color: GLOBAL.color.titleBase,
                letterSpacing: 2,
                paddingLeft: 8,
                // fontWeight: 'bold',
              }}>
              Aktivitas
            </Text>
          </View>
          <View
            style={{
              flex: 4,
              marginBottom: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              // alignItems: 'center',
              alignContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('DisposisiProses')}
              style={{
                alignItems: 'center',
                padding: 10,
                elevation: 5,
                marginRight: 4,
                width: '49%',
                backgroundColor: GLOBAL.color.screenBox,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  // fontWeight: 'bold',
                  fontFamily: GLOBAL.font.Anton,
                  color: GLOBAL.color.titleBase,
                  letterSpacing: 2,
                }}>
                Disposisi Proses
              </Text>
              <Text
                style={{
                  // fontWeight: 'bold',
                  fontSize: 48,
                  fontFamily: GLOBAL.font.Anton,
                  color: GLOBAL.color.titleBase,
                }}>
                {disposisiProses.length}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('DisposisiSelesai')}
              style={{
                alignItems: 'center',
                padding: 10,
                elevation: 5,
                marginRight: 4,
                width: '49%',
                backgroundColor: GLOBAL.color.screenBox,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  // fontWeight: 'bold',
                  letterSpacing: 2,
                  fontFamily: GLOBAL.font.Anton,
                  color: GLOBAL.color.titleBase,
                }}>
                Disposisi Selesai
              </Text>
              <Text
                style={{
                  // fontWeight: 'bold',
                  fontSize: 48,
                  fontFamily: GLOBAL.font.Anton,
                  color: GLOBAL.color.titleBase,
                }}>
                {disposisiSelesai.length}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 4,
              flexDirection: 'row',
              justifyContent: 'space-between',
              // alignItems: 'center',
              alignContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ListSuratMasukStack')}
              style={{
                alignItems: 'center',
                padding: 10,
                elevation: 5,
                marginRight: 4,
                width: '100%',
                backgroundColor: GLOBAL.color.screenBox,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  // fontWeight: 'bold',
                  fontFamily: GLOBAL.font.Anton,
                  color: GLOBAL.color.titleBase,
                  letterSpacing: 2,
                }}>
                Surat Masuk
              </Text>
              <Text
                style={{
                  // fontWeight: 'bold',
                  fontSize: 48,
                  fontFamily: GLOBAL.font.Anton,
                  color: GLOBAL.color.titleBase,
                }}>
                {suratmasuk.length}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{
                // flex: 1,
                alignItems: 'center',
                padding: 10,
                elevation: 5,
                marginRight: 4,
                width: '49%',
                backgroundColor: GLOBAL.color.screenBox,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  // fontWeight: 'bold',
                  letterSpacing: 2,
                  fontFamily: GLOBAL.font.Anton,
                  color: GLOBAL.color.titleBase,
                }}>
                Surat Keluar
              </Text>
              <Text
                style={{
                  // fontWeight: 'bold',
                  fontSize: 48,
                  fontFamily: GLOBAL.font.Anton,
                  color: GLOBAL.color.titleBase,
                }}>
                12
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </View>
  );
});

export default HomeScreen;

const styles = StyleSheet.create({
  uiBox: {
    padding: 10,
    elevation: 10,
    backgroundColor: GLOBAL.color.screenBox,
    flex: 1,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 10,
    borderTopStartRadius: 20,
    borderBottomEndRadius: 20,
    maxHeight: 350,
    borderTopEndRadius: 10,
    borderBottomStartRadius: 10,
  },
});
