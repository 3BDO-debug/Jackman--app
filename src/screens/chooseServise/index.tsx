import React, { FC } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import ChooseServiseView from "./view";
import Screen from "../../components/Screen";

interface ChooseServiseProps {
  navigation: NavigationProp<ParamListBase>;
}

const ChooseServise: FC<ChooseServiseProps> = ({ navigation }) => {
  return (
    <Screen navigation={navigation} hideFooter>
      <ChooseServiseView navigation={navigation} />
    </Screen>
  );
};

export default ChooseServise;
