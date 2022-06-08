import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// screens
import { LaunchingPage, SignIn } from "../screens";

// ----------------------------------------------------------------------

const Stack = createStackNavigator();

// ----------------------------------------------------------------------

const NotAuthenticatedLayout = () => {
  return (
    <Stack.Navigator
      initialRouteName="LaunchingPage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LaunchingPage" component={LaunchingPage} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
};

export default NotAuthenticatedLayout;
