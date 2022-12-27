import {
    Animated,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
} from "react-native";
import CalCircle from "./CalCircle";

export default function Calendar({ monthNum, yearNum, journals }) {
    const maxDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const firstDay = new Date(2022, monthNum, 1);
    const today = new Date();
    const overflow = maxDays[monthNum] - (28 + (7 - firstDay.getDay())) > 0;
    const rows = overflow ? [0, 1, 2, 3, 4, 5] : [0, 1, 2, 3, 4];
    const weekdays = [0, 1, 2, 3, 4, 5, 6];

    const getDateLabel = (row, column) => {
        let returnValue = row * 7 + 1 + column - (firstDay.getDay() % 7);
        if (returnValue > 0 && returnValue <= maxDays[monthNum]) {
            return returnValue;
        }
    };

    const thisMonth = (row, column) => {
        let returnValue = row * 7 + 1 + column - (firstDay.getDay() % 7);
        if (returnValue > maxDays[monthNum] || returnValue <= 0) {
            return false;
        }
        return true;
    };

    const beforeToday = (day, month, year) => {
        if (year > today.getFullYear()) {
            return false;
        }
        if (year == today.getFullYear() && month > today.getMonth()) {
            return false;
        }
        if (
            year == today.getFullYear() &&
            month == today.getMonth() &&
            day > today.getDate()
        ) {
            return false;
        }
        return true;
    };

    const getRandomColor = (day, month, year) => {
        if (!beforeToday(day, month, year)) {
            return { bgColor: "#EAEAFF", fontColor: "#9D9DB7" };
        }
        const colors = {
            Joyful: "#CDC577",
            Calm: "#98D386",
            Anxious: "#C0C0C0",
            Upset: "#CD959C",
            Sad: "#8888BB",
        };
        //if (journals[`${month + 1}` + day + year] === undefined) { FIX LATER PROB MORE EFFICIENT
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        if (`${month + 1}` + day + year in journals) {
            return {
                bgColor: colors[journals[`${month + 1}` + day + year].emotion],
                fontColor: "#FCFCFF",
            };
        }
        return {
            bgColor: "#EAEAFF",
            fontColor: "#9D9DB7",
        };
    };

    return (
        <View>
            {rows.map((number1, index) => (
                <View
                    key={index}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginTop: overflow ? 10 : 20,
                        alignContent: "center",
                    }}
                >
                    {weekdays.map((number2, index2) => (
                        <CalCircle
                            key={index2}
                            colors={getRandomColor(
                                getDateLabel(number1, number2),
                                monthNum,
                                yearNum
                            )}
                            label={getDateLabel(number1, number2)}
                            thisMonth={thisMonth(number1, number2)}
                        />
                    ))}
                </View>
            ))}
        </View>
    );
}
