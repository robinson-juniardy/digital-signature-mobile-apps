/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../partials/Header';
import {GLOBAL} from '../../styles/globalStyles';
import {constants} from '../../config/config';
import axios from 'axios';
import useAuth from '../../hook/useAuth';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationAction} from '@react-navigation/native';

const NotificationScreen = React.memo(({route, navigation}) => {
  const [notif, setNotif] = React.useState([]);

  const {auth} = useAuth();

  const getNotification = () => {
    axios
      .get(constants.backend_url + '/suratmasuk/notifikasi/' + auth.user_id)
      .then(response => {
        setNotif(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      getNotification();
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
        <Text
          style={{
            marginLeft: 20,
            fontFamily: GLOBAL.font.Anton,
            color: GLOBAL.color.titleBase,
          }}>
          Notifikasi Anda
        </Text>
      </View>
      <FlatList
        keyExtractor={item => item.id}
        data={notif}
        style={styles.flatlist}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              axios
                .post(
                  constants.backend_url + '/suratmasuk/notifikasi-update-read/',
                  {
                    id_notif: item.id,
                  },
                )
                .then(response => {
                  navigation.navigate('NotificationDetail', {
                    id_surat: item.id_surat,
                    filename: item.filename,
                    status_dokumen: item.status_dokumen2,
                  });
                })
                .catch(error => {
                  console.log(error);
                });
            }}
            style={{
              justifyContent: 'space-between',
              alignContent: 'flex-start',
              alignItems: 'flex-start',
              flexDirection: 'row',
              elevation: 4,
              padding: 10,
              margin: 1,
              backgroundColor:
                item.readmark === 1 ? GLOBAL.color.screenBox : '#DDFFBC',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                flexDirection: 'row',
                // margin: 5,
              }}>
              <Icon
                name="newspaper-outline"
                size={60}
                color={GLOBAL.color.titleBase}
              />

              <View
                style={{
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  alignItems: 'baseline',
                  alignContent: 'center',
                }}>
                {item.readmark === 0 && (
                  <Text style={{marginLeft: 10}}>Belum Dilihat</Text>
                )}

                <Text style={{marginLeft: 10}}>
                  {item.created_time.split('T')[0]}
                </Text>

                <Text
                  style={{
                    marginLeft: 10,
                    color: GLOBAL.color.titleBase,
                  }}>{`${item.pengirim}`}</Text>
                <Text
                  style={{
                    marginLeft: 10,
                    color: GLOBAL.color.titleBase,
                  }}>{`Mengirimkan Anda Sebuah ${item.jenis_notifikasi}`}</Text>
                <Text style={{marginLeft: 10, fontWeight: 'bold'}}>
                  {item.perihal_surat}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
});

export default NotificationScreen;

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
    padding: 10,
    margin: 1,
  },
});
