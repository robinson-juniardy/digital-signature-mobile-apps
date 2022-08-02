/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {GLOBAL} from '../styles/globalStyles';
import useAuth from '../hook/useAuth';
import Icon from 'react-native-vector-icons/Octicons';

const Header = () => {
  const {auth} = useAuth();
  useEffect(() => {}, []);
  return (
    <View>
      <View
        style={{
          padding: 10,
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
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignContent: 'center',
          alignItems: 'baseline',
        }}>
        <Icon name="person" size={14} />
        <Text style={{marginLeft: 10}}>
          {auth !== null && `${auth.nip} - ${auth.nama} - ${auth.role_name}`}
        </Text>
      </View>
    </View>
  );
};

export default Header;
