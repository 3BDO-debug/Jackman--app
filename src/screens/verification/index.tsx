import React, { FC, useEffect } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import VerificationView from './view';


interface VerificationProps {
  navigation: NavigationProp<ParamListBase>;
}

const Verification: FC<VerificationProps> = ({ route, navigation }) => {



  return (
    <>
      <VerificationView navigation={navigation} route={route} />

    </>
  );
};

export default Verification;
