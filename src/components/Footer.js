import { TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import Icon from "react-native-vector-icons/Foundation";
// theme
import { Colors } from "../constants/colors";
import { HomeIcon, Profile, QrBarIcon, QRIcon, User } from "../constants/svg";

// -------------------------------------------------------------------------------------

export default function Footer({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <HomeIcon color={Colors.WHITE} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.qrButtonWrapper}
          onPress={() => navigation.navigate("LatestQr")}
        >
          <QrBarIcon color={Colors.WHITE} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ProfilePage")}>
          <User />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  wrapper: {
    backgroundColor: Colors.BACKGROUND,
    paddingBottom: 50,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 80,
    alignItems: "center",
  },
  qrButtonWrapper: {
    backgroundColor: "#7F7F7F",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
