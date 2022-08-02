/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GLOBAL} from '../../styles/globalStyles';
import Header from '../../partials/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import useAuth from '../../hook/useAuth';

const SuratMasukScreen = ({navigation}) => {
  const [refresh, setRefresh] = useState(false);
  const {auth} = useAuth();
  const menuStaff = [
    {
      id: 1,
      title: 'Surat Masuk',
      path: 'ListSuratMasukStack',
    },
    {
      id: 4,
      title: 'Arsip Anda',
      path: 'SuratMasukArsip',
    },
  ];
  const menu = [
    {
      id: 1,
      title: 'Surat Masuk',
      path: 'ListSuratMasukStack',
    },
    {
      id: 2,
      title: 'Disposisi Selesai',
      path: 'DisposisiSelesai',
    },
    {
      id: 3,
      title: 'Disposisi On Proses',
      path: 'DisposisiProses',
    },
    {
      id: 4,
      title: 'Arsip Anda',
      path: 'SuratMasukArsip',
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: GLOBAL.color.screenContainer,
      }}>
      <Header />
      <View
        style={{
          flex: 2,
        }}>
        <View style={styles.uiBox}>
          <TouchableOpacity style={styles.listItem}>
            <Icon name="mail-open-outline" size={30} />
            <Text
              style={{
                fontFamily: GLOBAL.font.Anton,
                fontSize: 16,
                lineHeight: 23,
                color: GLOBAL.color.titleBase,
                letterSpacing: 2,
                paddingLeft: 8,
                // fontWeight: 'bold',
              }}>
              Surat Masuk
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <Icon name="git-branch-outline" size={30} />
            <Text
              style={{
                fontFamily: GLOBAL.font.Anton,
                fontSize: 16,
                lineHeight: 23,
                color: GLOBAL.color.titleBase,
                letterSpacing: 2,
                paddingLeft: 8,
                // fontWeight: 'bold',
              }}>
              Disposisi Selesai
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <Icon name="mail-open-outline" size={30} />
            <Text
              style={{
                fontFamily: GLOBAL.font.Anton,
                fontSize: 16,
                lineHeight: 23,
                color: GLOBAL.color.titleBase,
                letterSpacing: 2,
                paddingLeft: 8,
                // fontWeight: 'bold',
              }}>
              Surat Masuk
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <Icon name="git-branch-outline" size={30} />
            <Text
              style={{
                fontFamily: GLOBAL.font.Anton,
                fontSize: 16,
                lineHeight: 23,
                color: GLOBAL.color.titleBase,
                letterSpacing: 2,
                paddingLeft: 8,
                // fontWeight: 'bold',
              }}>
              Disposisi Selesai
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    // <View
    //   style={{
    //     flex: 1,
    //     backgroundColor: GLOBAL.color.screenContainer,
    //   }}>
    //   <Header />
    //   <FlatList
    //     // style={styles.listWrapper}
    //     refreshControl={
    //       <RefreshControl
    //         refreshing={refresh}
    //         onRefresh={() => setRefresh(false)}
    //       />
    //     }
    //     data={auth.login_role === 'staff' ? menuStaff : menu}
    //     keyExtractor={item => item.id}
    //     renderItem={({item}) => (
    //       <TouchableOpacity
    //         onPress={() => navigation.navigate(item.path)}
    //         style={styles.listItem}>
    //         <Text style={styles.listTitle}>{item.title}</Text>
    //         <Icon
    //           name="arrow-forward"
    //           size={20}
    //           color={GLOBAL.color.titleBase}
    //         />
    //       </TouchableOpacity>
    //     )}
    //   />
    //   {/* <View style={styles.listWrapper}>
    //     <TouchableOpacity
    //       onPress={() => navigation.navigate('ListSuratMasukStack')}
    //       style={styles.listItem}>
    //       <Text style={styles.listTitle}>Surat Masuk</Text>
    //       <Icon name="arrow-forward" size={20} color={GLOBAL.color.titleBase} />
    //     </TouchableOpacity>
    //     <TouchableOpacity style={styles.listItem}>
    //       <Text style={styles.listTitle}>Disposisi Selesai</Text>
    //       <Icon name="arrow-forward" size={20} color={GLOBAL.color.titleBase} />
    //     </TouchableOpacity>
    //     <TouchableOpacity style={styles.listItem}>
    //       <Text style={styles.listTitle}>Disposisi Proses</Text>
    //       <Icon name="arrow-forward" size={20} color={GLOBAL.color.titleBase} />
    //     </TouchableOpacity>
    //     <TouchableOpacity style={styles.listItem}>
    //       <Text style={styles.listTitle}>Arsip</Text>
    //       <Icon name="arrow-forward" size={20} color={GLOBAL.color.titleBase} />
    //     </TouchableOpacity>
    //   </View> */}
    // </View>
  );
};

export default SuratMasukScreen;

const styles = StyleSheet.create({
  listWrapper: {
    flex: 1,
    margin: 10,
    top: 0,
    padding: 5,
    backgroundColor: GLOBAL.color.titleBase,
    elevation: 5,
    alignContent: 'center',
    justifyContent: 'space-between',
    maxHeight: 255,
    // alignItems: 'center',
  },
  listItem: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    alignContent: 'center',
    margin: 1,
    backgroundColor: GLOBAL.color.screenBox,
    elevation: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  listTitle: {
    color: GLOBAL.color.titleBase,
  },
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
