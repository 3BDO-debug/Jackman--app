import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NetInfo from "@react-native-community/netinfo";
// screens
import {
  LaunchingPage,
  SignIn,
  Verification,
  ForgetPassword,
} from "../screens";
//
import WaitingForConnection from "../components/WaitingForConnection";

// -----------------------------------------------------------------------------------------------------------------------------------

const Stack = createStackNavigator();

// -----------------------------------------------------------------------------------------------------------------------------------

const NotAuthenticatedLayout = () => {
  const [mounted, setIsMounted] = useState(false);
  const [isInternetConnected, setInternetIsConnected] = useState(true);

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

  return (
    <>
      {isInternetConnected ? (
        <Stack.Navigator
          initialRouteName="LaunchingPage"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="LaunchingPage" component={LaunchingPage} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Verification" component={Verification} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        </Stack.Navigator>
      ) : (
        <WaitingForConnection />
      )}
    </>
  );
};

export default NotAuthenticatedLayout;
