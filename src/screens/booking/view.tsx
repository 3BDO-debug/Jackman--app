import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Dimensions,
  Pressable,
  BackHandler,
  Platform,
  Linking,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import createStyles from './styles';
import {
  Arrow,
  CarEditIcon,
  CarIcon,
  DateIcon,
  Profile,
  LocationIcon,
  NameIcon,
  PhoneIcon,
  TimeIcon,
  Edit,
  User,
  HashtagIcon,
  LArrowIcon,
  PhoneNumberIcon,
  CARICON,
  RArrowIcon,
} from '../../constants/svg';
import CustomText from '../../components/customText';
import { scaleHeightSize, scaleWidthSize } from '../../styles/mixins';
import CustomButton from '../../components/customButton';
import { Colors } from '../../constants/colors';
import TextBtn from '../../components/textBtn';
import CustomInput from '../../components/customInput';
import { ScrollView } from 'react-native-gesture-handler';
import { Date, QrCodeBooking } from '..';

import AdditionalInformationView from '../addtional/view';
import moment from 'moment';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import bookingAtom from '../../recoil/booking';
import authAtom from '../../recoil/auth';
import { AxiosContext } from '../../context/AxiosContext';
import Screen from '../../components/Screen';


interface BookingViewProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const BookingView: FC<BookingViewProps> = ({ navigation, route }) => {

  const [booking, setBooking] = useRecoilState(bookingAtom);
  const userData = useRecoilValue(authAtom).userData;
  const selectedCarName = booking?.carData?.manufacturer.name;
  const selectedCarModel = booking?.carData?.carType;
  const selectedCarChassisName = booking?.carData?.chassisName;
  const selectedCarId = booking?.carData?.id;
  const selecteDealerPhone = booking?.dealerData?.phoneNumber1;
  const selecteDealerId = booking?.dealerData?.id;
  const selecteDealerLat = "state.carService ? state.carService.latitude : ''";
  const selecteDealerLng = "state.carService ? state.carService.longitude : ''";

  const windowWidth = Dimensions.get('window').width;
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isPress, setIspress] = useState(true);
  const [confirm, setconfirm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(-1);


  useEffect(() => {
    if (booking) {
      setName(booking?.userData?.userFullname);
      setPhone(booking?.userData?.userPhone);
    }
  }, []);







  const StepItem = ({ number, title }: { number: string; title: string }) => {
    return (
      <View style={styles.stepContainer}>
        <View
          style={[
            styles.stepView,
            {
              backgroundColor:
                step >= parseInt(number) ? Colors.BUTTON : Colors.WHITE,
            },
          ]}>
          <CustomText
            color={step >= parseInt(number) ? 'white' : 'black'}
            text={number}
          />
        </View>
        <CustomText size={12} text={title} />
      </View>
    );
  };
  const styles = useMemo(() => createStyles(), []);

  const backAction = useCallback(() => {
    if (step > 1) {
      setStep(old => old - 1);
    } else {
      navigation.goBack();
    }
    return true;
  }, [step]);

  useEffect(() => {
    const handler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => handler.remove();
  }, [backAction]);

  useEffect(() => {
    if (route.params?.step == '2') {
      setStep(2);
    }
  }, [route.params]);

  const { authAxios } = useContext(AxiosContext);

  const [isBooking, setIsBooking] = useState(false);


  const handleBookingConfirmation = async () => {
    const dealerId = booking?.dealerData?.id;
    const carId = booking?.carData?.id;
    const reqDate1 = moment(booking?.datesData[0]?.selectedDate).format("YYYY-MM-DD");
    const reqTime1 = moment(booking?.datesData[0]?.selectedDate).format("HH:mm:SS");

    const reqDate2 = moment(booking?.datesData[1]?.selectedDate).format("YYYY-MM-DD");
    const reqTime2 = moment(booking?.datesData[1]?.selectedDate).format("HH:mm:SS");

    const reqDate3 = moment(booking?.datesData[2]?.selectedDate).format("YYYY-MM-DD");
    const reqTime3 = moment(booking?.datesData[2]?.selectedDate).format("HH:mm:SS");


    console.log("book", {
      dealer: dealerId,
      car: carId,
      requestedDate1: `${reqDate1}T${reqTime1}`,
      requestedDate2: `${reqDate2}T${reqTime2}`,
      requestedDate3: `${reqDate3}T${reqTime3}`
    });


    await authAxios.post("/booking/book", {
      dealer: dealerId,
      car: carId,
      requestedDate1: `${reqDate1}T${reqTime1}`,
      requestedDate2: `${reqDate2}T${reqTime2}`,
      requestedDate3: `${reqDate3}T${reqTime3}`
    }).then(() => {
      setStep(3);
      Alert.alert("WoooW!, Booking success.")
    }).catch((error) => {
      console.log("error while booking", error.response.data.message);
      Alert.alert("OPPPS!", "Something wrong happened while trying to book.");
    });

    setIsBooking(false);
  }


  useEffect(() => {
    if (name !== booking?.userData?.userFullname) {
      setBooking({ ...booking, userData: { userFullname: name, userPhone: phone, userCarMileage: booking.userData.userCarMileage } })
    }
  }, [name])

  useEffect(() => {
    if (phone !== booking?.userData?.userPhone) {
      setBooking({ ...booking, userData: { userPhone: phone, userFullname: booking.userData.userFullname, userCarMileage: booking.userData.userCarMileage } })
    }
  }, [phone])



  const validateUserData = () => {
    let valid;
    const phoneExp = phone.toString().slice(0, 4) === "0020";
    if (!/^\+20\d[10]/.test(phone)) {
      if (phoneExp) {
        valid = true
      } else {
        valid = false;
      }
    } else {
      valid = true;
    }

    return valid;
  }


  return (
    <Screen navigation={navigation} hideFooter>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        scrollEnabled={true}
        contentContainerStyle={step == 3 ? styles.contentContainer : {}}
        style={[styles.container, { paddingHorizontal: step == 2 ? 20 : 0 }]}>
        <View style={styles.stepsContainer}>
          <View style={styles.stepsViewContainer}>
            <TouchableOpacity
              onPress={() => {
                setStep(1);
              }}
              disabled={!isPress}>
              <StepItem number="1" title="Select" />
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity
              onPress={() => {
                setStep(2);
              }}
              disabled={!confirm}>
              <StepItem number="2" title="Confirm" />
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity>
              <StepItem number="3" title="Status" />
            </TouchableOpacity>
          </View>
          {/* Instructions text */}
          <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 10 }}>
            <CustomText text='Please select three dates for booking ' color="white" size={10} />
          </View>
        </View>
        {step == 1 && (
          <View style={{ width: windowWidth }}>
            <Date
              onPress={() => {
                setconfirm(true);
                navigation.navigate('AdditionalInformation');
                // setStep(2);
              }}
              selectedDate={date => {
                setSelectedDate(date);
              }}
              dateSelected={selectedDate}
              selectedTime={(time, index) => {
                setSelectedTime(time);
                setSelectedTimeIndex(index);
              }}
              navigation={navigation}
              timeSelected={selectedTimeIndex}
            />
          </View>
        )}

        {step == 2 && (
          <>
            <View style={styles.cardContainer}>
              {isPress ? (
                <>
                  <View style={styles.cardHeader}>
                    <CustomText
                      text="Personal Details"
                      color="black"
                      size={10}
                      fontFamily="bold"
                    />
                    <TouchableOpacity
                      style={{ height: 30 }}
                      onPress={() => {
                        setIspress(!isPress);
                      }}>
                      <Edit />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.cardBody}>
                    <View style={styles.rowItem}>
                      <Profile />
                      <CustomText
                        text={name}
                        color="black"
                        size={10}
                        style={styles.textItem}
                      />
                    </View>

                    <View style={[styles.rowItem, styles.rightText]}>
                      <PhoneNumberIcon />
                      <CustomText
                        num={1}
                        text={phone}
                        color="black"
                        size={10}
                        style={styles.textItem}
                      />
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.cardHeader}>
                    <CustomText
                      text="Personal Details"
                      color="black"
                      size={10}
                      fontFamily="bold"
                    />
                    <TextBtn
                      text="Save changes"
                      textSize={10}
                      fontFamily="regular"
                      onPress={() => {
                        if (name.length === 0) {
                          Alert.alert("Validation error", "Full name cannot be empty");
                        }
                        if (phone.length === 0) {
                          Alert.alert("Validation error", "Phone number cannot be empty");
                        }

                        if (name.length > 0 && phone.length > 0 && validateUserData()) {
                          setIspress(true);
                        } else {
                          Alert.alert("Validation error", "Phone number is not valid")
                        }


                      }}
                    />
                  </View>

                  <View style={styles.cardBody}>
                    <Profile />
                    <CustomInput
                      containerStyle={styles.inputContaier}
                      inputStyle={styles.input}
                      value={name}
                      onChangeText={text => {
                        setName(text);
                      }}
                    />
                  </View>

                  <View style={styles.cardBody}>
                    <PhoneNumberIcon />
                    <CustomInput
                      containerStyle={styles.inputContaier}
                      inputStyle={styles.input}
                      value={phone}
                      onChangeText={text => {
                        setPhone(text);
                      }}
                    />
                  </View>
                </>
              )}
            </View>

            <View style={styles.cardContainer}>
              <View style={styles.cardHeader}>
                <CustomText
                  text="Car Details"
                  color="black"
                  size={10}
                  fontFamily="bold"
                />
                <Pressable
                  onPress={() => {
                    navigation.navigate('ChooseCar');
                  }}>
                  <Edit />
                </Pressable>
              </View>
              <View style={styles.cardBody}>
                <View style={styles.rowItem}>
                  <CARICON />
                  <CustomText
                    text={selectedCarName + ' ' + selectedCarModel}
                    color="black"
                    size={10}
                    style={styles.textItem}
                  />
                </View>

                <View style={[styles.rowItem, styles.rightText]}>
                  <HashtagIcon />
                  <CustomText
                    num={1}
                    text={selectedCarChassisName}
                    color="black"
                    size={10}
                    style={styles.textItem}
                  />
                </View>
              </View>
            </View>

            <View style={styles.cardContainer}>
              <View style={styles.cardHeader}>
                <CustomText
                  text="Dealership Details"
                  color="black"
                  size={10}
                  fontFamily="bold"
                />
              </View>
              <View style={styles.cardBody}>
                <View style={styles.rowItem}>
                  <LocationIcon />
                  <TextBtn
                    text="Click for location"
                    textSize={10}
                    fontFamily="regular"
                    style={styles.location}
                    onPress={() => {
                      const scheme = Platform.select({
                        ios: 'maps:0,0?q=',
                        android: 'geo:0,0?q=',
                      });
                      const latLng = `${selecteDealerLat},${selecteDealerLng}`;
                      const label = 'Custom Label';
                      const url = Platform.select({
                        ios: `${scheme}${label}@${latLng}`,
                        android: `${scheme}${latLng}(${label})`,
                      });

                      Linking.openURL(url);
                    }}
                  />
                </View>

                {selecteDealerPhone && (
                  <View style={[styles.rowItem, styles.rightText]}>
                    <PhoneNumberIcon />
                    <CustomText
                      text={selecteDealerPhone || ''}
                      color="black"
                      size={10}
                      style={styles.textItem}
                    />
                  </View>
                )}
              </View>

              {booking?.datesData.map((dateData) => {
                return (
                  <View style={styles.cardBody}>
                    <View style={styles.rowItem}>
                      <DateIcon color={Colors.BLACK} width={16} height={16} />
                      <CustomText
                        text={moment(dateData.selectedDate).format('Do MMM')}
                        color="black"
                        size={10}
                        style={styles.textItem}
                      />
                    </View>

                    <View style={[styles.rowItem, styles.rightText]}>
                      <TimeIcon color={Colors.BLACK} />
                      <CustomText
                        num={1}
                        text={moment(dateData.time).format('HH.mm')}
                        color="black"
                        size={10}
                        style={styles.textItem}
                      />
                    </View>
                  </View>
                )
              }
              )}
            </View>
          </>
        )}

        {step == 3 && (
          <QrCodeBooking
            onDonePress={() => {
              navigation.navigate("Home");
            }}
          />
        )}
        {step == 2 && (
          <>
            {isBooking ? <ActivityIndicator size="large" style={styles.Btn} color={Colors.BUTTON} /> : <CustomButton
              containerStyle={[
                styles.Btn,
                { backgroundColor: !isPress ? Colors.GRAY : Colors.BUTTON },
              ]}
              text="Confirm"
              textSize={16}
              onPress={() => {
                setIsBooking(true);
                handleBookingConfirmation();

              }}
            />}
          </>
        )}

        {step === 2 && <CustomButton
          containerStyle={[
            styles.Btn,
            { backgroundColor: !isPress ? Colors.GRAY : Colors.BUTTON },
          ]}
          text="Confirm"
          textSize={16}
          onPress={() => {
            setIsBooking(true);
            handleBookingConfirmation();

          }}
        />}

        {/*   <CustomButton
          containerStyle={[
            styles.Btn,
            { backgroundColor: !isPress ? Colors.GRAY : Colors.BUTTON },
          ]}
          text="Confirm"
          textSize={16}
          onPress={() => {
            setIsBooking(true);
            handleBookingConfirmation();

          }}
        /> */}
      </ScrollView>
    </Screen>
  );
};

export default BookingView;
