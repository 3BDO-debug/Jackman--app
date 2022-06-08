import React, { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilState, useRecoilValue } from "recoil";
import { NavigationContainer } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
// context
import { AuthContext } from "../context/AuthContext";
import { AxiosContext } from "../context/AxiosContext";
// atoms
import authAtom from "../recoil/auth";
import updateUserInfoAtom from "../recoil/updateUserInfo";
// styles
import { Colors } from "../constants/colors";
// layouts
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import NotAuthenticatedLayout from "../layouts/NotAuthenticatedLayout";
// atoms
import drawerAtom from "../recoil/drawerAtom";
import WaitingForConnection from "./WaitingForConnection";

// --------------------------------------------------------------------------------------------------------------------------------------------

function AppContainer() {
  const authContext = useContext(AuthContext);
  const [auth, setAuth] = useRecoilState(authAtom);
  const { authAxios } = useContext(AxiosContext);
  const updateUserInfo = useRecoilValue(updateUserInfoAtom);
  const [authLayout, setIsAuthLayout] = useState(false);
  const windowHeight = Dimensions.get("window").height;
  const drawerStatus = useRecoilValue(drawerAtom).drawerStatus;
  const [loading, setLoading] = useState(false);
  const [isInternetConnected, setInternetIsConnected] = useState(false);

  const loadJWT = useCallback(async () => {
    try {
      const asyncStorageAccessToken = await AsyncStorage.getItem("accessToken");
      const asyncStorageRefreshToken = await AsyncStorage.getItem(
        "refreshToken"
      );

      authContext.setAuthState({
        accessToken: asyncStorageAccessToken || null,
        refreshToken: asyncStorageRefreshToken || null,
        authenticated: asyncStorageAccessToken !== null,
      });
    } catch (error) {
      console.log(`JWT AUTH ERROR: ${error.message}`);
    }
  }, []);

  const userDataFetcher = useCallback(async () => {
    if (authContext.authState.authenticated === true) {
      await authAxios
        .get("/user/auth/get")
        .then((response) => {
          setAuth({ ...auth, userData: response.data.result.data });
        })
        .catch((error) => console.log("not answer", error));
    } else {
      setAuth({ authenticated: false });
    }
  }, [authContext.authState, updateUserInfo]);

  useEffect(() => {
    setLoading(true);
    loadJWT();
  }, [loadJWT]);

  useEffect(() => {
    const asyncStorageCall = AsyncStorage.getItem("accessToken").then(
      async (response) => {
        if (response) {
          await userDataFetcher();
          setIsAuthLayout(true);
        } else {
          setIsAuthLayout(false);
        }
        setLoading(false);
      }
    );
    return () => false;
  }, [authContext.authState, userDataFetcher]);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setInternetIsConnected(!offline);
    });

    return () => removeNetInfoSubscription();
  }, []);

  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.BACKGROUND,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={Colors.BUTTON} />
        </View>
      ) : (
        <View
          style={{
            backgroundColor:
              drawerStatus === "opened" ? "#dedede" : Colors.BACKGROUND,
            height: windowHeight + 200,
          }}
        >
          {isInternetConnected ? (
            <NavigationContainer>
              {!loading && authLayout ? (
                <AuthenticatedLayout />
              ) : (
                <NotAuthenticatedLayout />
              )}
            </NavigationContainer>
          ) : (
            <WaitingForConnection />
          )}
        </View>
      )}
    </>
  );
}

export default AppContainer;
