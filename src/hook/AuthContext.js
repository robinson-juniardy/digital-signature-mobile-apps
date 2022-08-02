import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext(null);

const AuthProvider = ({children}) => {
  const [auth, setAuth] = React.useState(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      await AsyncStorage.getItem('credential')
        .then(value => {
          if (value !== null) {
            const users = JSON.parse(value);
            setAuth({
              disposision_level: users.disposision_level,
              role_name: users.role_name,
              login_role: users.role,
              nama: users.nama,
              user_id: users.id,
              nip: users.nip,
            });
          }
        })
        .catch(error => setAuth(null));
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
