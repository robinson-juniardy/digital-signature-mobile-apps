/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Pdf from 'react-native-pdf';
import {constants} from '../../config/config';
import {GLOBAL} from '../../styles/globalStyles';
import {StackActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import useAuth from '../../hook/useAuth';
import axios from 'axios';

const ArsipDetailScreen = ({route, navigation}) => {
  const source = {
    uri: constants.base_url + '/uploads/' + route.params.filename,
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: GLOBAL.color.screenBox,
          width: '100%',
          elevation: 5,
          padding: 10,
          margin: 1,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={GLOBAL.color.titleBase} />
        </TouchableOpacity>
        <Text
          style={{
            color: GLOBAL.color.titleBase,
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Detail
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
  );
};

export default ArsipDetailScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',

    // alignItems: 'center',
    // marginTop: 25,
    // backgroundColor: GLOBAL.color.screenContainer,
  },
  pdf: {
    flex: 1,
    margin: 1,
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
