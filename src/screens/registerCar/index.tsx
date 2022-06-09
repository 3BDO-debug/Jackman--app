import React, {FC, useEffect} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import RegisterView from './view';

import Loader from '../../components/loader';
import Screen from "../../components/Screen";

interface RegisterCarProps {
  navigation: NavigationProp<ParamListBase>;
}

const RegisterCar: FC<RegisterCarProps> = ({navigation}) => {
  


  
  return (
    <Screen hideFooter navigation={navigation}>
      <RegisterView navigation={navigation} />
    </Screen>
  );
};

export default RegisterCar;
