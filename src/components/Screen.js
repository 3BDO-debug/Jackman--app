import { View } from "react-native";
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
// atoms
import navigationAtom from "../recoil/navigation";
import drawerAtom from "../recoil/drawerAtom";
// components
import Header from "./Header";
import Footer from "./Footer";
// theme
import { Colors } from "../constants/colors";

// -------------------------------------------------------------------------------------------

const Screen = (props) => {
  const setNavigation = useSetRecoilState(navigationAtom);
  const drawerStatus = useRecoilValue(drawerAtom).drawerStatus;

  useEffect(() => {
    setNavigation(props.navigation);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.BACKGROUND,
        borderRadius: drawerStatus === "opened" ? 9 : 0,
      }}
    >
      <Header />
      <View style={{ flex: 1 }}>{props.children}</View>
      {!props.hideFooter && <Footer navigation={props.navigation} />}
    </View>
  );
};

export default Screen;
