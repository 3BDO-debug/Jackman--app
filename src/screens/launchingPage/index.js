import React, { useContext } from "react";
import LaunchingPageView from "./view";
import { View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { AxiosContext } from "../../context/AxiosContext";
import * as Facebook from "expo-facebook";
 // import useGoogleLogin from "../../hooks/useGoogleLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LaunchingPage = ({ route, navigation }) => {
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);

  //const [loadingGoogleLogin, promptGoogleLogin] = useGoogleLogin();

  /* const signGoogle = () => {
    promptGoogleLogin();
  }; */

  const singFacebook = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "337851891519808",
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["email", "public_profile"],
        });

      if (type === "success") {
        await publicAxios
          .get(`/user/auth/facebook?access_token=${token}`)
          .then(async (response) => {
            authContext.setAuthState({
              accessToken: response.data.result.data.token,
              refreshToken: response.data.result.data.refreshToken,
              authenticated: true,
            });
            await AsyncStorage.setItem(
              "accessToken",
              response.data.result.data.token
            );
            await AsyncStorage.setItem(
              "refreshToken",
              response.data.result.data.refreshToken
            );
          });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      console.log("error with facebook login", message);
    }
  };


  return (
    <View style={{ flex: 1 }}>
      <LaunchingPageView
       
        singFacebook={singFacebook}
        navigation={navigation}
        route={route}
      />
    </View>
  );
};

export default LaunchingPage;
