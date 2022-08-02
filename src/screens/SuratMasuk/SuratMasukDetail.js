/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect} from 'react';
import Pdf from 'react-native-pdf';
import {constants} from '../../config/config';
import {GLOBAL} from '../../styles/globalStyles';
import Header from '../../partials/Header';
import {StackActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import useAuth from '../../hook/useAuth';
import axios from 'axios';

const SuratMasukDetailScreen = ({route, navigation}) => {
  const {auth} = useAuth();
  const source = {
    uri: constants.base_url + '/uploads/' + route.params.filename,
  };

  useEffect(() => {}, []);

  console.log('status_sokumen', route.params.status_dokumen);
  const handleProses = async () => {
    await axios
      .post(constants.backend_url + '/suratmasuk/proses', {
        status: auth.login_role === 'ka_opd' ? 1 : 4,
        id_surat: route.params.id_surat,
        created_by: auth.nip,
      })
      .then(response => {
        if (response.data.status === 1) {
          ToastAndroid.showWithGravity(
            'Dokumen Berhasil Di Proses',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          navigation.dispatch(StackActions.replace('ListSuratMasukStack'));
        } else {
          console.log(response.data.message);
          ToastAndroid.showWithGravity(
            'Dokumen Gagal Di Proses',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.showWithGravity(
          'Dokumen Gagal Di Proses',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      });
  };

  const handleSelesai = () => {
    axios
      .post(constants.backend_url + '/suratmasuk/proses', {
        status: auth.login_role === 'ka_opd' ? 3 : 5,
        id_surat: route.params.id_surat,
        created_by: auth.nip,
      })
      .then(response => {
        if (response.data.status === 1) {
          ToastAndroid.showWithGravity(
            'Dokumen Selesai Di Proses',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          handleArsipkan();
          navigation.dispatch(StackActions.replace('ListSuratMasukStack'));
        } else {
          console.log(response.data.message);
          ToastAndroid.showWithGravity(
            'Gagal Menyelesaikan Dokumen',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.showWithGravity(
          'Gagal Menyelesaikan Dokumen',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      });
  };

  const handleDisposisi = () => {};

  const handleArsipkan = () => {
    axios
      .post(constants.backend_url + '/suratmasuk/arsip', {
        jenis_arsip: 'suratmasuk',
        id_surat: route.params.id_surat,
        created_by: auth.nip,
      })
      .then(response => {
        if (response.data.status === 1) {
          ToastAndroid.showWithGravity(
            'Dokumen Berhasil Di Arsipkan',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          navigation.dispatch(StackActions.replace('ListSuratMasukStack'));
        } else {
          console.log(response.data.message);
          ToastAndroid.showWithGravity(
            'Dokumen Gagal Di Arsipkan',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.showWithGravity(
          'Dokumen Gagal Di Arsipkan',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      });
  };
  return (
    // <View>
    <View style={styles.container}>
      {/* <Header /> */}
      <View
        style={{
          padding: 10,
          width: '100%',
          backgroundColor: GLOBAL.color.screenBox,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'baseline',
          elevation: 5,
          margin: 1,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.dispatch(StackActions.replace('ListSuratMasukStack'))
          }>
          <Icon name="arrow-back" size={18} color={GLOBAL.color.titleBase} />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 20,
            fontFamily: GLOBAL.font.Anton,
            color: GLOBAL.color.titleBase,
          }}>
          Detail Dokumen
        </Text>
      </View>
      {auth.login_role === 'ka_opd' ? (
        route.params.status_dokumen === 3 ? null : (
          <View style={styles.toolbar}>
            {route.params.status_dokumen === 1 ? (
              <TouchableOpacity
                onPress={handleSelesai}
                style={styles.toolbarAction}>
                <Text>Selesai</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleProses}
                style={styles.toolbarAction}>
                <Text>Proses</Text>
              </TouchableOpacity>
            )}

            {route.params.status_dokumen !== 1 && (
              <TouchableOpacity
                onPress={() =>
                  navigation.dispatch(
                    StackActions.push('Disposisi', {
                      id_surat: route.params.id_surat,
                      filename: route.params.filename,
                    }),
                  )
                }
                style={styles.toolbarAction}>
                <Text>Disposisi</Text>
              </TouchableOpacity>
            )}

            {route.params.status_dokumen !== 1 && (
              <TouchableOpacity
                onPress={handleSelesai}
                style={styles.toolbarAction}>
                <Text>Arsipkan</Text>
              </TouchableOpacity>
            )}
          </View>
        )
      ) : route.params.status_dokumen === 5 ? null : (
        <View style={styles.toolbar}>
          {route.params.status_dokumen === 4 ? (
            <TouchableOpacity
              onPress={handleSelesai}
              style={styles.toolbarAction}>
              <Text>Selesai</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleProses}
              style={styles.toolbarAction}>
              <Text>Proses</Text>
            </TouchableOpacity>
          )}

          {route.params.status_dokumen !== 4 && auth.login_role !== 'staff' && (
            <TouchableOpacity
              onPress={() =>
                navigation.dispatch(
                  StackActions.push('Disposisi', {
                    id_surat: route.params.id_surat,
                    filename: route.params.filename,
                  }),
                )
              }
              style={styles.toolbarAction}>
              <Text>Disposisi</Text>
            </TouchableOpacity>
          )}

          {route.params.status_dokumen !== 4 && auth.login_role !== 'staff' && (
            <TouchableOpacity
              onPress={handleSelesai}
              style={styles.toolbarAction}>
              <Text>Arsipkan</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <Pdf
        trustAllCerts={false}
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
    // </View>
  );
};

export default SuratMasukDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // marginTop: 25,
    // backgroundColor: GLOBAL.color.screenContainer,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  toolbarAction: {
    alignItems: 'center',
    margin: 1,
    flex: 1,
    padding: 10,
    backgroundColor: GLOBAL.color.screenBox,
    elevation: 5,
    // alignSelf: 'center',
  },
});
