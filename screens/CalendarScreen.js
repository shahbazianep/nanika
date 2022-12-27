import { useFonts } from "expo-font";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableHighlight,
    TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import CalCircle from "../components/CalCircle";
import Calendar from "../components/Calendar";

export default function CalendarScreen({ route, navigation }) {
    const [loaded] = useFonts({
        "optician-sans": require("../assets/fonts/Optician-Sans.otf"),
    });

    const today = new Date();
    const [currMonth, setCurrMonth] = useState(today.getMonth());
    const [currYear, setCurrYear] = useState(today.getFullYear());
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

    const getMonth = () => {
        return months[currMonth];
    };

    if (!loaded) {
        return null;
    }
    return (
        <View
            style={{
                flex: 1,
                flexDirection: "column",
                backgroundColor: "#F7F7FF",
            }}
        >
            <View
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: 90,
                    backgroundColor: "#FCFCFF",
                    flexDirection: "row",
                    paddingTop: 40,
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "#B3B3BB",
                }}
            >
                <Text
                    style={{
                        fontFamily: "optician-sans",
                        fontSize: 32,
                        alignSelf: "center",
                    }}
                >
                    Calendar
                </Text>
                <TouchableOpacity
                    underlayColor={"transparent"}
                    style={{
                        position: "absolute",
                        right: 33,
                        padding: 5,
                        top: 33,
                    }}
                    onPress={() => {
                        navigation.navigate("HomeScreen");
                    }}
                >
                    <MaterialIcons name="close" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flexDirection: "column",
                    alignItems: "center",
                    alignSelf: "center",
                    justifyContent: "center",
                    marginTop: 200,
                }}
            >
                <View
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius: 50,
                        backgroundColor: "#EAEAFF",
                        marginBottom: 100,
                        alignContent: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "optician-sans",
                            fontSize: 36,
                            color: "#5C5C5C",
                            textAlign: "center",
                        }}
                    >
                        {months[today.getMonth()].slice(0, 3)}
                        {"\n"}
                        {today.getDate()}
                    </Text>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <TouchableOpacity
                        underlayColor={"transparent"}
                        onPress={() => {
                            if (currMonth == 0) {
                                setCurrMonth(11);
                                setCurrYear(currYear - 1);
                            } else {
                                setCurrMonth(currMonth - 1);
                            }
                        }}
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: 40,
                            height: 40,
                        }}
                    >
                        <MaterialIcons
                            name="keyboard-arrow-left"
                            size={32}
                            color="#5C5C5C"
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignContent: "center",
                            alignSelf: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "tenor-sans",
                                fontSize: 24,
                                color: "#5C5C5C",
                                textAlign: "center",
                            }}
                        >
                            {getMonth()}
                        </Text>
                        <Text
                            style={{
                                fontFamily: "optician-sans",
                                fontSize: 16,
                                color: "#5C5C5C",
                                textAlign: "center",
                            }}
                        >
                            {currYear}
                        </Text>
                    </View>

                    <TouchableOpacity
                        underlayColor={"transparent"}
                        onPress={() => {
                            if (currMonth + 1 == 12) {
                                setCurrMonth(0);
                                setCurrYear(currYear + 1);
                            } else {
                                setCurrMonth(currMonth + 1);
                            }
                        }}
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: 40,
                            height: 40,
                        }}
                    >
                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={32}
                            color="#5C5C5C"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    backgroundColor: "#FCFCFF",
                    position: "absolute",
                    height: 350,
                    bottom: 0,
                    right: 0,
                    left: 0,
                }}
            >
                <View
                    style={{
                        height: 45,
                        backgroundColor: "#FCFCFF",
                        borderWidth: 1,
                        borderColor: "#B3B3BB",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                    }}
                >
                    {weekdays.map((day) => (
                        <Text
                            style={{
                                fontSize: 24,
                                fontFamily: "optician-sans",
                                color: "#5C5C5C",
                            }}
                        >
                            {day}
                        </Text>
                    ))}
                </View>
                <Calendar
                    monthNum={currMonth}
                    yearNum={currYear}
                    journals={route.params.journals}
                ></Calendar>
            </View>
        </View>
    );
}
