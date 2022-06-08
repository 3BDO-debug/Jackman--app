import {
  SimpleLineIcons,
  Ionicons,
  Feather,
  AntDesign,
} from "react-native-vector-icons";

const drawerLinks = [
  {
    label: "Home",
    icon: <SimpleLineIcons name="home" size={23} />,
    href: "Home",
  },
  {
    label: "Latest Services",
    icon: <Ionicons name="qr-code-outline" size={23} />,
    href: "LatestQr",
  },
  {
    label: "Dealers Locations",
    icon: <Ionicons name="location-outline" size={23} />,
    href: "DealersLocations",
  },
  {
    label: "FAQ",
    icon: <AntDesign name="questioncircleo" size={23} />,
    href: "FAQ",
  },
];

export default drawerLinks;
