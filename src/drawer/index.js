import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ScalingDrawer from "react-native-scaling-drawer";
import NavigationService from "./NavigationService";
import { useRecoilState } from "recoil";
import { Keyboard } from "react-native";
// atoms
import drawerAtom from "../recoil/drawerAtom";
// screens
import {
  Personal,
  RegisterCar,
  QrCode,
  CarHistory,
  ProfilePage,
  EditCar,
  AdditionalInformation,
  Date,
  ChooseCar,
  Booking,
  ChooseServise,
  Home,
  QrCodeBooking,
  LatestQr,
  Frequentlyq,
} from "../screens";
//
import DrawerContent from "./DrawerContent";
import drawer from "./drawerRef";
// screens
import NotificationsScreen from "../screens/notifications/NotificationsScreen";
import DealersLocations from "../screens/dealersLocations/DealersLocations";

// ----------------------------------------------------------------------------------------

const AppStack = createStackNavigator();

const MyStack = React.forwardRef((props, myStackRef) => {
  return (
    <AppStack.Navigator ref={myStackRef} screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="ChooseCar" component={ChooseCar} />
      <AppStack.Screen name="ProfilePage" component={ProfilePage} />
      <AppStack.Screen name="LatestQr" component={LatestQr} />
      <AppStack.Screen name="Notifications" component={NotificationsScreen} />
      <AppStack.Screen name="DealersLocations" component={DealersLocations} />
      <AppStack.Screen name="FAQ" component={Frequentlyq} />
      <AppStack.Screen name="ChooseServise" component={ChooseServise} />
      <AppStack.Screen name="Booking" component={Booking} />
      <AppStack.Screen
        name="AdditionalInformation"
        component={AdditionalInformation}
      />
      <AppStack.Screen name="QrCode" component={QrCode} />
      <AppStack.Screen name="EditCar" component={EditCar} />
      <AppStack.Screen name="RegisterCar" component={RegisterCar} />
      <AppStack.Screen name="CarHistory" component={CarHistory} />

    </AppStack.Navigator>
  );
});

const defaultScalingDrawerConfig = {
  scalingFactor: 0.8,
  minimizeFactor: 0.5,
  swipeOffset: 50,
};

export default function AppNavigation() {
  const setDrawer = useRecoilState(drawerAtom)[1];

  return (
    <ScalingDrawer
      ref={drawer}
      {...defaultScalingDrawerConfig}
      content={<DrawerContent drawerRef={drawer} />}
      onClose={() => setDrawer({ drawerStatus: "closed" })}
      onOpen={() => {
        Keyboard.dismiss();
        setDrawer({ drawerStatus: "opened" });
      }}
    >
      <MyStack
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
        drawerRef={drawer}
      />
    </ScalingDrawer>
  );
}
