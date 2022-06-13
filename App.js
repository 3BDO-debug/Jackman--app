import "react-native-gesture-handler";
import { RecoilRoot } from "recoil";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
// context
import { AuthProvider } from "./src/context/AuthContext";
import { AxiosProvider } from "./src/context/AxiosContext";
//
import AppContainer from "./src/components/AppContainer";
import { Colors } from "./src/constants/colors";

// ------------------------------------------------------------------------------------------------------

export default function App() {
  const [loaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <RecoilRoot>
      <AuthProvider>
        <AxiosProvider>
          <SafeAreaProvider>
            <StatusBar backgroundColor={Colors.BACKGROUND} translucent={true} />
            <AppContainer />
          </SafeAreaProvider>
        </AxiosProvider>
      </AuthProvider>
    </RecoilRoot>
  );
}
