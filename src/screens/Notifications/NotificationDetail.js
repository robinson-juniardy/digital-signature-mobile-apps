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

const NotificationDetail = ({route, navigation}) => {
  const {auth} = useAuth();
  const source = {
    uri: constants.base_url + '/uploads/' + route.params.filename,
  };

  useEffect(() => {}, []);
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
            navigation.dispatch(StackActions.replace('Notification'))
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

export default NotificationDetail;

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
    marginTop: 10,
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
