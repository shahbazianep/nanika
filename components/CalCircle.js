import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import {
    Animated,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
} from "react-native";
import { db } from "../firebaseConfig";

export default function CalCircle({ label, colors, thisMonth }) {
    // const getRandomEmotion = () => {
    //     const emotions = ["Sad", "Upset", "Anxious", "Calm", "Joyful"];
    //     return emotions[Math.floor(Math.random() * 5)];
    // };
    //
    // const addData = async () => {
    //     var date = "12172022";
    //     await updateDoc(doc(db, "users", "ZMxK3OhaF42TUs1n1jb3"), {
    //         [`journals.${date}`]: {
    //             emotion: getRandomEmotion(),
    //             thoughts: "no weinkls.",
    //         },
    //     });
    // };

    return (
        <TouchableOpacity
            underlayColor={"transparent"}
            onPress={() => {
                loadDayInfo();
            }}
        >
            <View
                style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 64,
                }}
            >
                <View
                    style={{
                        height: 35,
                        width: 35,
                        borderRadius: 20,
                        backgroundColor: thisMonth
                            ? colors.bgColor
                            : "transparent",
                        borderColor: thisMonth ? "transparent" : "#EAEAFF",
                        borderWidth: 1,
                        alignItems: "center",
                        justifyContent: "start",
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "optician-sans",
                            fontSize: 24,
                            color: thisMonth ? colors.fontColor : "#000000",
                            marginTop: 7,
                            textAlign: "center",
                            textAlignVertical: "center",
                        }}
                    >
                        {label}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
