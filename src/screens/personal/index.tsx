import React, { FC, useEffect } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import PersonalView from './view';

interface PersonalProps {
  navigation: NavigationProp<ParamListBase>;
  route: NavigationRoute<ParamListBase>;
}

const Personal: FC<PersonalProps> = ({ navigation, route }) => {


  return <PersonalView navigation={navigation} route={route} />;
};

export default Personal;
