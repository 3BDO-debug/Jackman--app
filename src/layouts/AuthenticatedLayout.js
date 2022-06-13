import { View } from "react-native";
import { useState, useEffect, useContext, useCallback } from "react";
import NetInfo from "@react-native-community/netinfo";
// drawer
import DrawerNavigation from "../drawer";
//
import WaitingForConnection from "../components/WaitingForConnection";
import { AuthContext } from "../context/AuthContext";
import { AxiosContext } from "../context/AxiosContext";
import { useRecoilState, useRecoilValue } from "recoil";
import authAtom from "../recoil/auth";
import updateUserInfoAtom from "../recoil/updateUserInfo";

function AuthenticatedLayout() {
  const [mounted, setIsMounted] = useState(false);
  const [isInternetConnected, setInternetIsConnected] = useState(true);
  const authContext = useContext(AuthContext);
  const { authAxios } = useContext(AxiosContext);
  const [auth, setAuth] = useRecoilState(authAtom);
  const updateUserInfo = useRecoilValue(updateUserInfoAtom);

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
  }, [authContext]);

  useEffect(() => {
    if (mounted) {
      const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
        const offline = !(state.isConnected && state.isInternetReachable);
        setInternetIsConnected(!offline);
      });

      return () => removeNetInfoSubscription();
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    userDataFetcher();
  }, [updateUserInfo]);

  return (
    <View style={{ flex: 1 }}>
      {isInternetConnected ? <DrawerNavigation /> : <WaitingForConnection />}
    </View>
  );
}

export default AuthenticatedLayout;
