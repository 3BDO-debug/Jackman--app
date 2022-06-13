import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { View, ScrollView, TextInput, BackHandler, Alert } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import createStyles from "./styles";
import CustomText from "../../components/customText";
import CustomInput from "../../components/customInput";
import { Arrow, Logo } from "../../constants/svg";
import CustomButton from "../../components/customButton";
import { Colors } from "../../constants/colors";

import { useRecoilState, useRecoilValue } from "recoil";
import authAtom from "../../recoil/auth";
import bookingAtom from "../../recoil/booking";
import phoneNumberValidator from "../../utils/phoneNumberValidator";
import userFullnameValidator from "../../utils/userFullnameValidator";

interface AdditionalInformationViewProps {
  navigation: NavigationProp<ParamListBase>;
}

const AdditionalInformationView: FC<AdditionalInformationViewProps> = ({
  navigation,
}) => {
  const styles = useMemo(() => createStyles(), []);
  const userData = useRecoilValue(authAtom).userData;

  const [booking, setBooking] = useRecoilState(bookingAtom);

  const [fullName, setFullName] = useState(userData.name);
  const [phone, setPhone] = useState(userData.phoneNumber);

  const [milage, setMilage] = useState("");

  const backAction = useCallback(() => {
    navigation.navigate("Booking", { step: "1" });

    return true;
  }, []);

  const milageValidator = () => {
    let valid;
    const convertedMilage = parseInt(milage, 10);
    const isValid = !isNaN(convertedMilage) && convertedMilage > 0;

    return isValid;
  };

  const validationAlert = (type) => {
    if (type === "phoneNumber") {
      /* Phone number validaiton goes here */
      Alert.alert("Validation error", "Phone number is not valid");
    } else if (type === "userFullname") {
      /* User full name validaiton goes here */
      Alert.alert("Validation error", "Full name is not valid");
    } else if (type === "milage") {
      Alert.alert("Validation error", "Milage is not valid");
    }
  };

  const formSubmissionValidator = () => {
    let valid;
    if (!milageValidator()) {
      valid = false;
      validationAlert("milage");
    } else if (!phoneNumberValidator(phone)) {
      valid = false;
      validationAlert("phoneNumber");
    } else {
      valid = true;
    }
    return valid;
  };

  useEffect(() => {
    const handler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => handler.remove();
  }, [backAction]);

  return (
    <ScrollView
      keyboardShouldPersistTaps={"handled"}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Logo style={styles.logo} />

      <CustomText text="Additional Information " size={25} fontFamily="bold" />

      <CustomInput
        placeholder="Full Name"
        value={fullName}
        inputStyle={styles.input}
        containerStyle={[styles.nameInput, styles.inputContainer]}
        required={true}
        onChangeText={(text) => {
          setFullName(text);
        }}
      />

      <CustomInput
        placeholder="Phone"
        value={phone}
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
        required={true}
        keyboardType="phone-pad"
        onChangeText={(text) => {
          setPhone(text);
        }}
      />

      <CustomInput
        placeholder="Milage"
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
        keyboardType="numeric"
        required={true}
        onChangeText={(text) => {
          setMilage(text.trim());
        }}
      />
      <View style={styles.viewText}>
        <CustomInput
          placeholder="Additional comments (If any)"
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
        />
      </View>

      <CustomButton
        rightIcon={<Arrow />}
        containerStyle={[
          styles.confirtBtn,
          {
            backgroundColor:
              !fullName || !milage || !phone ? Colors.GRAY : Colors.BUTTON,
          },
        ]}
        disabled={!fullName || !milage || !phone}
        text="CONTINUE"
        textSize={16}
        onPress={() => {
          if (formSubmissionValidator()) {
            
            setBooking({
              ...booking,
              userData: {
                userFullname: fullName,
                userPhone: phone,
                userCarMileage: milage,
              },
            });
            
            navigation.navigate("Booking", { step: "2" });
          }
        }}
      />
    </ScrollView>
  );
};

export default AdditionalInformationView;
