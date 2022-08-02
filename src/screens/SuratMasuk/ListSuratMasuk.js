/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  RefreshControl,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GLOBAL} from '../../styles/globalStyles';
import Header from '../../partials/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import useAuth from '../../hook/useAuth';
import axios from 'axios';
import {constants} from '../../config/config';
import {StackActions} from '@react-navigation/native';
const ListSuratMasukScreen = React.memo(({route, navigation}) => {
  const {auth} = useAuth();
  const [suratmasuk, setsuratmasuk] = useState([]);
  const [refresh, setRefresh] = useState(false);

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
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: GLOBAL.color.screenContainer,
      }}>
      <Header />
      {/* <ScrollView> */}
      <View
        style={{
          padding: 10,
          width: '100%',
          backgroundColor: GLOBAL.color.screenBox,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'baseline',
          elevation: 5,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.dispatch(StackActions.push('SuratMasukRoot'))
          }>
          <Icon name="arrow-back" size={18} color={GLOBAL.color.titleBase} />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 20,
            fontFamily: GLOBAL.font.Anton,
            color: GLOBAL.color.titleBase,
          }}>
          List Surat Masuk Anda
        </Text>
      </View>

      <FlatList
        style={styles.flatlist}
        data={suratmasuk}
        keyExtractor={item =>
          auth.login_role === 'ka_opd' ? item.id : item.id_surat
        }
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              getSuratMasuk();
              setRefresh(false);
            }}
          />
        }
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SuratMasukDetail', {
                id_surat:
                  auth.login_role === 'ka_opd' ? item.id : item.id_surat,
                filename: item.filename,
                status_dokumen: item.status_dokumen,
                // getSuratMasuk: getSuratMasuk,
              })
            }
            style={styles.listItem}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                flexDirection: 'row',
                // margin: 5,
              }}>
              <Icon
                name="newspaper-outline"
                size={20}
                color={item.jenis_surat === 'Penting' ? 'red' : 'green'}
              />

              <Text style={{marginLeft: 10}}>{item.perihal_surat}</Text>
            </View>
            <Icon
              name="arrow-forward"
              size={20}
              color={GLOBAL.color.titleBase}
            />
          </TouchableOpacity>
        )}
      />
      {/* </ScrollView> */}
    </View>
  );
});

export default ListSuratMasukScreen;

const styles = StyleSheet.create({
  flatlist: {
    flex: 1,
    margin: 5,
  },
  listItem: {
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    elevation: 4,
    backgroundColor: GLOBAL.color.screenBox,
    padding: 10,
    margin: 1,
  },
});
