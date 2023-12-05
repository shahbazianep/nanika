import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import {
    Animated,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
} from "react-native";
import { db } from "../firebaseConfig";
import { COLORS } from "../assets/constants.js";

export default function CalCircle({ label, colors, thisMonth }) {
    function loadDayInfo() {}

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
                        borderColor: thisMonth
                            ? "transparent"
                            : COLORS.periwinkle,
                        borderWidth: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "optician-sans",
                            fontSize: 24,
                            color: thisMonth ? colors.fontColor : COLORS.black,
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
