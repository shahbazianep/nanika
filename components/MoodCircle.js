import {
    Animated,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
} from "react-native";

export default function MoodCircle({
    title,
    color,
    borderColor,
    textColor,
    clickFunction,
}) {
    return (
        <TouchableOpacity
            underlayColor={"transparent"}
            onPress={() => {
                clickFunction();
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
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        borderWidth: 3,
                        borderColor: borderColor,
                        backgroundColor: color,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                ></View>
                <Text
                    style={{
                        fontFamily: "optician-sans",
                        fontSize: 16,
                        height: 16,
                        color: textColor,
                        marginTop: 7,
                    }}
                >
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
