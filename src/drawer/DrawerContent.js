import { Text, View, ScrollView, Alert, TouchableOpacity } from "react-native";
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
import { SettingsIcon } from "../constants/svg";
import CustomText from "../components/customText";
import TextBtn from "../components/textBtn";

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
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.avatarText}>{userData?.name}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate("ProfilePage");
                drawerRef.current.close();
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  color: Colors.BUTTON,
                  textDecorationLine: "underline",
                }}
              >
                Edit profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Drawer links wrapper */}
        <View style={styles.drawerLinksWrapper}>
          {drawerLinks.map((drawerLink) => (
            <TouchableOpacity
            
              onPress={() => {
                navigation?.navigate(drawerLink.href);
                drawerRef.current.close();
              }}
            >
              <View style={styles.drawerLinkWrapper}>
                {drawerLink.icon}
                <Text style={styles.drawerLinkText}>{drawerLink.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.bottomDrawerContainer}>
          <TouchableOpacity
            onPress={() => {
              drawerRef.current.close();
              navigation?.navigate("ProfilePage", { type: 2 });
            }}
            style={styles.logOutItemContainer}
          >
            <View style={styles.drawerIconContainer}>
              <SettingsIcon />
            </View>

            <CustomText text="Settings" color="black" size={13} />
          </TouchableOpacity>

          <View style={styles.line} />

          <TextBtn
            text="Log out"
            textColor="black"
            fontFamily="regular"
            underline={false}
            onPress={() => {
              Alert.alert("", "Are you sure to logout?", [
                {
                  text: "Cancel",
                  onPress: () => {},
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => {
                    logoutConfirmHandler();
                  },
                },
              ]);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default DrawerContent;

const styles = ScaledSheet.create({
  wrapper: {
    marginTop: "60@s",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height:"100%",
  },
  avatarWrapper: {
    flexDirection: "row",
    paddingLeft: "27@s",
    alignItems: "center",
  },
  avatarText: {
    fontFamily: "Poppins-Medium",
    fontSize: "12@s",
    color: Colors.BLACK,
  },
  drawerLinksWrapper: {
    paddingVertical: "110@s",
    paddingHorizontal: "35@s",
    
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
  bottomDrawerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "17@s",
    marginTop:110
    
  },
  logOutItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  drawerIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 44,
    height: 44,
  },
  line: {
    height: "70%",
    width: 1,
    backgroundColor: Colors.BLACK,
    marginHorizontal: 10,
  },
});
