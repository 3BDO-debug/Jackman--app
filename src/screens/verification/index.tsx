import React, {FC, useEffect} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import VerificationView from './view';


interface VerificationProps {
  navigation: NavigationProp<ParamListBase>;
}

const Verification: FC<VerificationProps> = ({navigation}) => {
  

  
  return (
    <>
      <VerificationView navigation={navigation} />
     
    </>
  );
};

export default Verification;
