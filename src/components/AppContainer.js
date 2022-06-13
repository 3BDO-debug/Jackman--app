import React, { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilValue } from "recoil";
import { NavigationContainer } from "@react-navigation/native";
// context
import { AuthContext } from "../context/AuthContext";
// styles
import { Colors } from "../constants/colors";
// layouts
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import NotAuthenticatedLayout from "../layouts/NotAuthenticatedLayout";
// atoms
import drawerAtom from "../recoil/drawerAtom";

// --------------------------------------------------------------------------------------------------------------------------------------------

function AppContainer() {
  const authContext = useContext(AuthContext);
  const [authLayout, setIsAuthLayout] = useState(null);
  const windowHeight = Dimensions.get("window").height;
  const drawerStatus = useRecoilValue(drawerAtom).drawerStatus;
  const [loading, setLoading] = useState(true);
  const [mounted, setIsMounted] = useState(false);
  const [loadingJWT, setIsLoadingJWT] = useState(true);

  const loadJWT = async () => {
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
    setIsLoadingJWT(false);
  };

  const renderLayout = () => {
    let context;
    if (authLayout !== null) {
      if (authLayout) {
        context = <AuthenticatedLayout />;
      } else {
        context = <NotAuthenticatedLayout />;
      }
      return context;
    }
  };

  useEffect(() => {
    setLoading(true);
    loadJWT();
  }, []);

  useEffect(() => {
    if (!loadingJWT) {
      if (authContext.authState.authenticated) {
        setIsAuthLayout(true);
      } else {
        setIsAuthLayout(false);
      }
      setLoading(false);
    }
  }, [authContext.authState, loadingJWT]);

  useEffect(() => {
    if (authLayout !== null && loading === false) {
      setIsMounted(true);
    } else {
      setIsMounted(false);
    }
  }, [authLayout, loading]);

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
          <NavigationContainer>{mounted && renderLayout()}</NavigationContainer>
        </View>
      )}
    </>
  );
}

export default AppContainer;
