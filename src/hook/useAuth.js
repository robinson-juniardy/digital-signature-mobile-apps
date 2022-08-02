/* eslint-disable react-hooks/rules-of-hooks */
import react, {useContext} from 'react';
import {AuthContext} from './AuthContext';

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
