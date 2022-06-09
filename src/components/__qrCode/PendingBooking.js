import React from "react";
import { StyleSheet, View, Text } from "react-native";
import moment from "moment";
//
import { DateIcon } from "../../constants/svg";
import { TimeIcon } from "../../constants/svg";
import { Colors } from "../../constants/colors";

// -----------------------------------------------------------------------------------------------

function PendingBooking({ triggeredBooking }) {
  const renderTitle = (index) => {
    let title;
    if (index === 0) {
      title = "First requested date";
    } else if (index === 1) {
      title = "Second requested date";
    } else if (index === 2) {
      title = "Third requested date";
    }
    return title;
  };

  return triggeredBooking?.requestedDates.map((requestedDate, index) => (
    <View>
      {/* Requested date container */}
      <View
        style={[
          styles.requestedDateContainer,
          { marginTop: index > 0 ? 18 : 0 },
        ]}
      >
        <Text style={styles.requestedDateContainerTitle}>
          {renderTitle(index)}
        </Text>
        <View style={styles.dataAndTime}>
          <View style={styles.txtAndIcon}>
            <DateIcon color={Colors.BLACK} height={20} width={14} />
            <Text
              style={[
                styles.text,
                { fontFamily: "Poppins-Regular", fontSize: 15 },
              ]}
            >
              {new Date(requestedDate).toDateString()}
            </Text>
          </View>

          <View style={styles.line} />

          <View style={styles.txtAndIcon}>
            <TimeIcon color={Colors.BLACK} height={20} width={14} />
            <Text
              style={[
                styles.text,
                { fontSize: 15, fontFamily: "Poppins-Regular" },
              ]}
            >
              {moment(requestedDate).format("hh:mm:A")}
            </Text>
          </View>
        </View>
      </View>
      {/* Divider wrapper */}
      {index !== triggeredBooking?.requestedDates.length - 1 && (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View
            style={{
              backgroundColor: Colors.GRAY,
              height: 1,
              width: "70%",
              marginHorizontal: 10,
              opacity: 0.5,
            }}
          />
        </View>
      )}
    </View>
  ));
}

const styles = StyleSheet.create({
  requestedDateContainer: {
    paddingHorizontal: 30,
  },
  requestedDateContainerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
  },
  requestedDateContainerBody: {
    fontFamily: "Poppins-Medium",
    fontSize: 15,
  },
  dataAndTime: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 30,
  },
  txtAndIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 10,
  },
  line: {
    height: "100%",
    width: 1,
    backgroundColor: Colors.PLACEHOLDER,
  },
});

export default PendingBooking;
