import React, { FC, useMemo } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import ProfileView from "./view";
import Screen from "../../components/Screen";


interface ProfilePageProps {
    navigation: NavigationProp<ParamListBase>
    route: NavigationRoute<ParamListBase>
}

const ProfilePage: FC<ProfilePageProps> = ({ navigation, route }) => {
    return (
        <Screen navigation={navigation} hideFooter>
            <ProfileView navigation={navigation} route={route} />
        </Screen>
    )
}

export default ProfilePage;