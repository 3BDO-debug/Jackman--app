import { View, Text, ScrollView } from "react-native";
import React from "react";
// styles
import notificationsScreenStyles from "./NotificationsScreenStyles";
import NotificationCard from "../../components/NotificationCard";
import Screen from "../../components/Screen";

const NotificationsScreen = ({ navigation }) => {
  return (
    <Screen navigation={navigation}>
      <View style={notificationsScreenStyles.wrapper}>
        {/* Title wrapper */}
        <View style={notificationsScreenStyles.titleWrapper}>
          <Text style={notificationsScreenStyles.title}>Notifications</Text>
        </View>
        {/* Notifications card wrapper */}
        <View style={notificationsScreenStyles.scrollWrapper}>
          <ScrollView>
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
          </ScrollView>
        </View>
      </View>
    </Screen>
  );
};

export default NotificationsScreen;
