import {
    Animated,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    SafeAreaView,
    Keyboard,
    TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MoodCircle from "../components/MoodCircle";
import { useState, useEffect, useContext } from "react";
import { moodColors, moodBorderColors, emotions } from "../assets/constants";
import { useCallback } from "react";

export default function JournalScreen({ route, navigation }) {
    const [highlightedEmotion, setHighlightedEmotion] = useState(
        route.params.pressedEmotion
    );

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

    function submitLog() {
        if (shortResponse == "") {
            setsrError(true);
        }
        if (longResponse == "") {
            setlrError(true);
        }
    }

    return (
        <View
            style={{
                backgroundColor: "pink",
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
                    backgroundColor: "#FCFCFF",
                    flexDirection: "row",
                    paddingTop: 40,
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "#B3B3BB",
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
                            backgroundColor: "#F7F7FF",
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
                                    color: "#A6A6AD",
                                }}
                            >
                                Journal 001
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    marginTop: 10,
                                    marginLeft: 12,
                                    fontFamily: "tenor-sans",
                                    fontSize: 24,
                                    color: "#5C5C5C",
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
                                marginTop: 30,
                            }}
                        >
                            {emotions.map((emotion, index) => (
                                <MoodCircle
                                    clickFunction={() => changeColors(emotion)}
                                    title={emotion}
                                    key={index}
                                    borderColor={
                                        highlightedEmotion == emotion
                                            ? moodBorderColors[emotion][0]
                                            : moodBorderColors[emotion][1]
                                    }
                                    color={
                                        highlightedEmotion == emotion
                                            ? moodColors[emotion][0]
                                            : moodColors[emotion][1]
                                    }
                                    textColor={
                                        highlightedEmotion == emotion
                                            ? "#5C5C5C"
                                            : "#A6A6AD"
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
                                    marginTop: 45,
                                    color: "#5C5C5C",
                                }}
                            >
                                What other emotions do I feel?
                                {/* IDEA: ADD OTHER QUESTIONS BASED ON THE USERS SELECTED EMOTION */}
                            </Text>
                        </View>

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
                        />
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
                        </View>
                        <View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: "tenor-sans",
                                    marginLeft: 12,
                                    marginTop: 45,
                                    color: "#5C5C5C",
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
                                borderBottomColor: lrError ? "red" : "#484848",
                                borderColor: lrError ? "red" : "transparent",
                                padding: 10,
                                paddingTop: 10,
                                fontSize: 16,
                                fontFamily: "tenor-sans",
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                backgroundColor: "#D9D9D9",
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
                                    color: lrError ? "red" : "#A6A6AD",
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
                                    marginTop: 40,
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: "#D9D9D9",
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
