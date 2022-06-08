import React, { FC, useEffect } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import EditCarView from './view';
import Screen from '../../components/Screen';


interface EditCarCarProps {
  navigation: NavigationProp<ParamListBase>;
}

const EditCarCar: FC<EditCarCarProps> = ({ route, navigation }) => {




  return (
    <Screen navigation={navigation} hideFooter>
      <EditCarView route={route} navigation={navigation} />
    </Screen>
  )
};

export default EditCarCar;
