import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useDrawerStatus } from "@react-navigation/drawer";
import { MenuIcon, XIcon } from "../constants/svg";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import drawerAtom from "../recoil/drawerAtom";
import drawer from "../drawer/drawerRef";

const Header = () => {
  const navigation = useNavigation();

  const drawerStatus = useRecoilValue(drawerAtom).drawerStatus;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {drawerStatus === "opened" ? (
          <TouchableOpacity onPress={() => drawer.current.close()}>
            <XIcon />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => drawer.current.open()}>
            <MenuIcon />
          </TouchableOpacity>
        )}
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
