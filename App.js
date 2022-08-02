import {View, Text} from 'react-native';
import React from 'react';
import HomeScreen from './src/screens/Home/HomeScreen';
import HomeStackNavigation from './src/navigation/HomeStackNavigation';
import Login from './src/screens/Auth/Login';
import AuthStackNavigation from './src/navigation/AuthStackNavigation';
import AuthProvider from './src/hook/AuthContext';
import {Provider as PaperProvider} from 'react-native-paper';

const App = () => {
  // return <HomeStackNavigation />;
  return (
    <AuthProvider>
      <PaperProvider>
        <AuthStackNavigation />
      </PaperProvider>
    </AuthProvider>
  );
};

export default App;
