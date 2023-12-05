import { useState } from "react";
import {
    Animated,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
} from "react-native";

import { COLORS } from "../assets/constants.js";

export default function Chip(props) {
    const [color, setColor] = useState(COLORS.white);

    return (
        <TouchableOpacity
            underlayColor={"transparent"}
            onPress={() => {
                setColor(
                    color === COLORS.white ? COLORS.lightGrey : COLORS.white
                );
            }}
        >
            <View
                style={{
                    borderRadius: 25,
                    borderWidth: 1,
                    padding: 8,
                    borderColor: COLORS.darkGrey,
                    backgroundColor: color,
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 4,
                }}
            >
                <Text style={{ fontFamily: "tenor-sans" }}>
                    {props.children}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
