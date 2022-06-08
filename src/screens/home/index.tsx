import React, { FC, useEffect, useMemo } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import HomeView from './view';
import Screen from '../../components/Screen';


interface HomeProps {
  navigation: NavigationProp<ParamListBase>;
}

const Home: FC<HomeProps> = ({ route, navigation }) => {

  return (
    <Screen navigation={navigation}>
      <HomeView route={route} navigation={navigation} />
    </Screen>
  )
};

export default Home;
