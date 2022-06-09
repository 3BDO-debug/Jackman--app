import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useDrawerStatus } from "@react-navigation/drawer";
import { MenuIcon, XIcon } from "../constants/svg";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../constants/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import drawerAtom from "../recoil/drawerAtom";
import drawer from "../drawer/drawerRef";
import {default as MaterialIcon} from "react-native-vector-icons/MaterialIcons"


const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [isHomeScreen, setIsHomeScreen] = useState(false);

  const drawerStatus = useRecoilValue(drawerAtom).drawerStatus;

  const renderHeaderAction = () => {
    let context;
    if (isHomeScreen) {
      if (drawerStatus === "opened") {
        context = (
          <TouchableOpacity onPress={() => drawer.current.close()}>
            <XIcon />
          </TouchableOpacity>
        );
      } else {
        context = (
          <TouchableOpacity onPress={() => drawer.current.open()}>
            <MenuIcon />
          </TouchableOpacity>
        );
      }
    } else {
      context = (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcon name="keyboard-backspace" size={25} color={Colors.WHITE} />
        </TouchableOpacity>
      );
    }
    return context;
  };

  useEffect(() => {
    if (route.name === "Home") {
      setIsHomeScreen(true);
    } else {
      setIsHomeScreen(false);
    }
  }, [route.name]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {renderHeaderAction()}
        {/* Logo */}
        <View style={styles.logoWrapper}>
          <Image source={require("../assets/images/logo.png")} />
        </View>
        {/* Notifications */}
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <Icon name="notifications-outline" size={24} color={Colors.WHITE} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  wrapper: {
    paddingHorizontal: "5@s",
    paddingVertical: "40@s",
    backgroundColor: Colors.BACKGROUND,
    marginBottom: -60,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logoWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Header;
