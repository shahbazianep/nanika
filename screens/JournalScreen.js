import {
    Animated,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    TextInput,
    Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MoodCircle from "../components/MoodCircle";
import Chip from "../components/Chip";
import { useState, useEffect, useContext } from "react";
import {
    MOOD_COLORS,
    MOOD_BORDER_COLORS,
    EMOTIONS,
    COLORS,
} from "../assets/constants";
import { addDoc, arrayUnion, setDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const moreEmotions = [
    "Joy",
    "Sadness",
    "Love",
    "Anxiety",
    "Fatigue",
    "Anger",
    "Embarrassment",
    "Pride",
    "Curiousity",
    "Hurt",
    "Boredom",
    "Surprise",
    "Hope",
    "Guilt",
];

export default function JournalScreen({ route, navigation }) {
    const [highlightedEmotion, setHighlightedEmotion] = useState(
        route.params.pressedEmotion
    );

    const date = new Date();
    var todayDate;
    if (date.getMonth() < 9 && date.getDate() < 10) {
        todayDate =
            `0${date.getMonth() + 1}` +
            "0" +
            date.getDate() +
            date.getFullYear();
    } else if (date.getMonth() < 9 && date.getDate() >= 10) {
        todayDate =
            `0${date.getMonth() + 1}` + date.getDate() + date.getFullYear();
    } else if (date.getMonth() >= 9 && date.getDate() < 10) {
        todayDate =
            `${date.getMonth() + 1}` +
            "0" +
            date.getDate() +
            date.getFullYear();
    } else {
        todayDate =
            `${date.getMonth() + 1}` + date.getDate() + date.getFullYear();
    }

    const [shortResponse, onChangeShortResponse] = useState("");
    const [longResponse, onChangeLongResponse] = useState("");
    const [srError, setsrError] = useState(false);
    const [lrError, setlrError] = useState(false);

    function handleLongTextInput(newText) {
        onChangeLongResponse(newText);
        setlrError(false);
    }
    function handleShortTextInput(newText) {
        onChangeShortResponse(newText);
        setsrError(false);
    }

    function changeColors(emotion) {
        setHighlightedEmotion(emotion);
    }

    async function submitLog() {
        if (shortResponse == "") {
            setsrError(true);
        }
        if (longResponse == "") {
            setlrError(true);
        }
        if (longResponse != "" && shortResponse != "") {
            Alert.alert(
                "Existing Journal",
                "You already have a journal for today. Would you like to overwrite your existing journal entry?",
                [
                    {
                        text: "Confirm",
                        onPress: () => {
                            updateDoc(doc(db, "users", route.params.userID), {
                                journals: {
                                    [todayDate]: {
                                        longResponse: longResponse,
                                        shortResponse: shortResponse,
                                        emotion: highlightedEmotion,
                                    },
                                },
                            });
                            setTimeout(
                                () => navigation.navigate("HomeScreen"),
                                1000
                            );
                        },
                    },
                    { text: "Cancel", style: "cancel" },
                ]
            );
        }
    }

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}
        >
            <View
                style={{
                    left: 0,
                    right: 0,
                    height: 90,
                    zIndex: 1,
                    backgroundColor: COLORS.white,
                    flexDirection: "row",
                    paddingTop: 40,
                    justifyContent: "center",
                    borderBottomWidth: 1,
                    borderColor: COLORS.darkGrey,
                }}
            >
                <TouchableOpacity
                    underlayColor={"transparent"}
                    style={{
                        position: "absolute",
                        left: 33,
                        padding: 5,
                        top: 33,
                    }}
                    onPress={() => {
                        navigation.navigate("HomeScreen");
                    }}
                >
                    <MaterialIcons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text
                    style={{
                        fontFamily: "optician-sans",
                        fontSize: 32,
                        alignSelf: "center",
                    }}
                >
                    Journal
                </Text>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, backgroundColor: "transparent" }}
                keyboardVerticalOffset={0}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View
                        style={{
                            backgroundColor: COLORS.white,
                            flex: 1,
                            justifyContent: "center",
                        }}
                    >
                        <View>
                            <Text
                                style={{
                                    marginTop: 30,
                                    marginLeft: 12,
                                    fontFamily: "optician-sans",
                                    fontSize: 16,
                                    color: COLORS.mediumGrey,
                                }}
                            >
                                Journal {route.params.journalNum}
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    marginTop: 20,
                                    marginLeft: 12,
                                    fontFamily: "tenor-sans",
                                    fontSize: 24,
                                    color: COLORS.darkGrey,
                                }}
                            >
                                Today, I'm feeling:
                            </Text>
                        </View>

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                                marginTop: 10,
                            }}
                        >
                            {EMOTIONS.map((emotion, index) => (
                                <MoodCircle
                                    clickFunction={() => changeColors(emotion)}
                                    title={emotion}
                                    key={index}
                                    borderColor={
                                        highlightedEmotion == emotion
                                            ? MOOD_BORDER_COLORS[emotion][0]
                                            : MOOD_BORDER_COLORS[emotion][1]
                                    }
                                    color={
                                        highlightedEmotion == emotion
                                            ? MOOD_COLORS[emotion][0]
                                            : MOOD_COLORS[emotion][1]
                                    }
                                    textColor={
                                        highlightedEmotion == emotion
                                            ? COLORS.darkGrey
                                            : COLORS.mediumGrey
                                    }
                                />
                            ))}
                        </View>
                        <View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: "tenor-sans",
                                    marginLeft: 12,
                                    marginTop: 20,
                                    color: COLORS.darkGrey,
                                }}
                            >
                                What other emotions do I feel?
                            </Text>
                        </View>
                        {/* 
                        <TextInput
                            style={{
                                margin: 12,
                                marginBottom: 4,
                                height: 40,
                                borderWidth: 1,
                                borderBottomColor: srError ? "red" : "#484848",
                                borderColor: srError ? "red" : "transparent",
                                padding: 10,
                                fontSize: 16,
                                fontFamily: "tenor-sans",
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                backgroundColor: "#D9D9D9",
                            }}
                            value={shortResponse}
                            maxLength={100}
                            onChangeText={(newText) =>
                                handleShortTextInput(newText)
                            }
                        /> */}
                        <View
                            style={{
                                flexDirection: "row",
                                width: "100%",
                                padding: 10,
                                flexWrap: "wrap",
                            }}
                        >
                            {moreEmotions.map((e, i) => {
                                return <Chip>{e}</Chip>;
                            })}
                        </View>
                        {/* 
                        <View>
                            <Text
                                style={{
                                    fontFamily: "optician-sans",
                                    fontSize: 12,
                                    color: srError ? "red" : "#A6A6AD",
                                    marginLeft: 12,
                                }}
                            >
                                {srError
                                    ? "Please enter a response."
                                    : shortResponse.length + "/100"}
                            </Text>
                        </View> */}
                        <View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: "tenor-sans",
                                    marginLeft: 12,
                                    marginTop: 20,
                                    color: COLORS.darkGrey,
                                }}
                            >
                                Thoughts about my day:
                            </Text>
                        </View>

                        <TextInput
                            style={{
                                margin: 12,
                                marginBottom: 4,
                                height: 150,
                                borderWidth: 1,
                                borderBottomColor: lrError
                                    ? "red"
                                    : COLORS.darkGrey,
                                borderColor: lrError ? "red" : "transparent",
                                padding: 10,
                                paddingTop: 10,
                                fontSize: 16,
                                fontFamily: "tenor-sans",
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                backgroundColor: COLORS.lightGrey,
                            }}
                            multiline={true}
                            maxLength={400}
                            value={longResponse}
                            onChangeText={(newText) =>
                                handleLongTextInput(newText)
                            }
                        />
                        <View>
                            <Text
                                style={{
                                    fontFamily: "optician-sans",
                                    fontSize: 12,
                                    color: lrError ? "red" : COLORS.mediumGrey,
                                    marginLeft: 12,
                                }}
                            >
                                {lrError
                                    ? "Please enter a response."
                                    : longResponse.length + "/400"}
                            </Text>
                            <View
                                style={{
                                    justifyContent: "center",
                                    alignContent: "center",
                                    marginTop: 20,
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: COLORS.lightGrey,
                                        justifyContent: "center",
                                        alignContent: "center",
                                        alignSelf: "center",
                                        padding: 10,
                                        width: 100,
                                        borderRadius: 10,
                                    }}
                                    onPress={() => {
                                        submitLog();
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            fontFamily: "tenor-sans",
                                            fontSize: 18,
                                        }}
                                    >
                                        Log
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: 80 }}></View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
}
