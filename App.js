import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { TransitionSpecs } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingScreen from "./screens/LandingScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import CalendarScreen from "./screens/CalendarScreen.js";
import JournalScreen from "./screens/JournalScreen.js";
import ClusterScreen from "./screens/ClusterScreen.js";
import LoginScreen from "./screens/LoginScreen.js";

const Stack = createNativeStackNavigator();

export default function App() {
    const [loaded] = useFonts({
        "optician-sans": require("./assets/fonts/Optician-Sans.otf"),
    });

    if (!loaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LandingScreen" component={LandingScreen} />
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ animation: "fade" }}
                />
                <Stack.Screen
                    name="CalendarScreen"
                    component={CalendarScreen}
                    options={{ animation: "fade" }}
                />
                <Stack.Screen
                    name="JournalScreen"
                    component={JournalScreen}
                    options={{ animation: "fade" }}
                />
                <Stack.Screen
                    name="ClusterScreen"
                    component={ClusterScreen}
                    options={{ animation: "fade" }}
                />
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ animation: "fade" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCFCFF",
        alignItems: "center",
        justifyContent: "center",
    },
});
