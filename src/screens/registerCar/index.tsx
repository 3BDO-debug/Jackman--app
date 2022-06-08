import React, {FC, useEffect} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import RegisterView from './view';

import Loader from '../../components/loader';

interface RegisterCarProps {
  navigation: NavigationProp<ParamListBase>;
}

const RegisterCar: FC<RegisterCarProps> = ({navigation}) => {
  


  
  return (
    <>
      <RegisterView navigation={navigation} />
    </>
  );
};

export default RegisterCar;
