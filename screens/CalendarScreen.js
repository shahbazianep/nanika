import { useFonts } from "expo-font";
import {
    Text,
    View,
    Button,
    TouchableHighlight,
    TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import Calendar from "../components/Calendar";

import { COLORS } from "../assets/constants.js";

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

    const calcDate = () => {
        if (today.getMonth() < 10 && today.getDay() < 10) {
            return (
                `0${today.getMonth() + 1}` +
                `0${today.getDate()}` +
                today.getFullYear()
            );
        } else if (today.getMonth() < 10 && today.getDay() >= 10) {
            return (
                `0${today.getMonth() + 1}` +
                `${today.getDate()}` +
                today.getFullYear()
            );
        } else if (today.getMonth() >= 10 && today.getDay() < 10) {
            return (
                `${today.getMonth() + 1}` +
                `0${today.getDate()}` +
                today.getFullYear()
            );
        } else {
            return (
                `${today.getMonth() + 1}` +
                `${today.getDate()}` +
                today.getFullYear()
            );
        }
    };

    if (!loaded) {
        return null;
    }
    return (
        <View
            style={{
                flex: 1,
                flexDirection: "column",
                backgroundColor: COLORS.white,
                height: "100%",
            }}
        >
            <View
                style={{
                    width: "100%",
                    height: 90,
                    backgroundColor: COLORS.white,
                    flexDirection: "row",
                    paddingTop: 40,
                    justifyContent: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.darkGrey,
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
                    <MaterialIcons
                        name="close"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
            </View>
            {/* <View
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
                        backgroundColor:
                            calcDate() in route.params.journals
                                ? colors[
                                      route.params.journals[calcDate()].emotion
                                  ]
                                : "#EAEAFF",
                        marginBottom: 100,
                        alignContent: "center",
                        justifyContent: "center",
                        paddingTop: 10,
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
                        {months[today.getMonth()].slice(0, 3)} {"\n"}
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
                            {months[currMonth]}
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
            </View> */}
            <View
                style={{
                    backgroundColor: COLORS.white,
                    height: 350,
                }}
            >
                <View
                    style={{
                        height: 45,
                        backgroundColor: COLORS.white,
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.darkGrey,
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                    }}
                >
                    {weekdays.map((day, index) => (
                        <Text
                            style={{
                                fontSize: 24,
                                fontFamily: "optician-sans",
                                color: COLORS.darkGrey,
                            }}
                            key={index}
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
            <View style={{ display: "flex", flexDirection: "row" }}>
                <View
                    style={{
                        backgroundColor: COLORS.periwinkle,
                        height: 50,
                        width: "50%",
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "optician-sans",
                            fontSize: 36,
                            color: COLORS.darkGrey,
                            textAlign: "center",
                        }}
                    >
                        {months[today.getMonth()].slice(0, 3) +
                            " " +
                            today.getDate()}
                    </Text>
                </View>
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        height: 50,
                        width: "50%",
                        borderBottomLeftRadius: 30,
                        shadowColor: COLORS.periwinkle,
                        shadowOffset: { width: -30, height: 25 },
                        shadowOpacity: 1,
                        shadowRadius: 0,
                    }}
                >
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
                                color={COLORS.darkGrey}
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
                                    fontSize: 18,
                                    color: COLORS.darkGrey,
                                    textAlign: "center",
                                }}
                            >
                                {months[currMonth]}
                            </Text>
                            {/* <Text
                                style={{
                                    fontFamily: "optician-sans",
                                    fontSize: 16,
                                    color: "#5C5C5C",
                                    textAlign: "center",
                                }}
                            >
                                {currYear}
                            </Text> */}
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
                                color={COLORS.darkGrey}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View
                style={{
                    backgroundColor: COLORS.periwinkle,
                    width: "100%",
                    height: "100%",
                    borderTopRightRadius: 30,
                }}
            ></View>
        </View>
    );
}
