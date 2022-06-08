import React, { FC, useMemo } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import ChooseCarView from './view';
import Screen from '../../components/Screen';

interface ChooseCarProps {
  navigation: NavigationProp<ParamListBase>;
}

const ChooseCar: FC<ChooseCarProps> = ({ navigation }) => {
  return (
    <Screen navigation={navigation} hideFooter>
      <ChooseCarView navigation={navigation} />
    </Screen>
  )
};

export default ChooseCar;
