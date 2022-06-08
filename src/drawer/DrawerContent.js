import { Text, View, ScrollView, Alert } from "react-native";
import React, { useContext } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { Avatar, TouchableRipple } from "react-native-paper";
import { MaterialIcons } from "react-native-vector-icons";
import { useRecoilState, useRecoilValue } from "recoil";
// atoms
import navigationAtom from "../recoil/navigation";
import drawerAtom from "../recoil/drawerAtom";
import authAtom from "../recoil/auth";
// context
import { AuthContext } from "../context/AuthContext";
// theme
import { Colors } from "../constants/colors";
//
import drawerLinks from "./drawerLinks";
import drawer from "./drawerRef";

const DrawerContent = ({ drawerRef }) => {
  const navigation = useRecoilValue(navigationAtom);
  const authContext = useContext(AuthContext);
  const setDrawerStatus = useRecoilState(drawerAtom)[1];

  const userData = useRecoilValue(authAtom)?.userData;

  const logoutConfirmHandler = () => {
    setDrawerStatus({ drawerStatus: "closed", drawerRef: {} });
    authContext.logout();
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        {/* Avatar wrapper */}
        <View style={styles.avatarWrapper}>
          <Avatar.Image size={44} />
          <Text style={styles.avatarText}>{userData?.name}</Text>
        </View>
        {/* Drawer links wrapper */}
        <View style={styles.drawerLinksWrapper}>
          {drawerLinks.map((drawerLink) => (
            <TouchableRipple
              onPress={() => {
                navigation?.navigate(drawerLink.href);
                drawerRef.current.close();
              }}
            >
              <View style={styles.drawerLinkWrapper}>
                {drawerLink.icon}
                <Text style={styles.drawerLinkText}>{drawerLink.label}</Text>
              </View>
            </TouchableRipple>
          ))}
        </View>
        {/* Logout wrapper */}
        <TouchableRipple
          onPress={() => {
            Alert.alert(
              "Notice !",
              "You are about to logout, do you want to procced",
              [
                { text: "Cancel", onPress: () => {} },
                {
                  text: "Logout",
                  onPress: () => logoutConfirmHandler(),
                },
              ]
            );
          }}
        >
          <View style={styles.logoutWrapper}>
            <MaterialIcons name="logout" size={23} />
            <Text style={styles.logoutText}>Log out</Text>
          </View>
        </TouchableRipple>
      </ScrollView>
    </View>
  );
};

export default DrawerContent;

const styles = ScaledSheet.create({
  wrapper: {
    paddingVertical: "70@s",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  avatarWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: "27@s",
    alignItems: "center",
  },
  avatarText: {
    fontFamily: "Poppins-Medium",
    fontSize: "12@s",
    color: Colors.BLACK,
    marginLeft: "20@s",
  },
  drawerLinksWrapper: {
    paddingVertical: "110@s",
    paddingLeft: "35@s",
  },
  drawerLinkWrapper: {
    flexDirection: "row",

    alignItems: "center",
    marginBottom: "25@s",
  },
  drawerLinkText: {
    fontFamily: "Poppins-Regular",
    fontSize: "13@s",
    color: Colors.BLACK,
    marginLeft: "16@s",
  },
  logoutWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "40@s",
  },
  logoutText: {
    fontFamily: "Poppins-Regular",
    fontSize: "13@s",
    textDecorationLine: "underline",
    marginLeft: "16@s",
  },
});
