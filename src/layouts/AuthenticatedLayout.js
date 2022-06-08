import { View } from "react-native";
// drawer
import DrawerNavigation from "../drawer";

function AuthenticatedLayout() {
  return (
    <View style={{ flex: 1 }}>
      <DrawerNavigation />
    </View>
  );
}

export default AuthenticatedLayout;
