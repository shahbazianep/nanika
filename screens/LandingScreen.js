import { useFonts } from "expo-font";
import { Component, useEffect, useState } from "react";
import { Animated, Text, View, TouchableOpacity } from "react-native";
import * as Font from "expo-font";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig.js";

export default class LandingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "Nanika",
            fontName: "optician-sans",
            fontSize: 48,
            fontsLoaded: false,
            fontOpacity: new Animated.Value(1),
        };
    }

    NavtoAuthOrHome(navigation) {
        setTimeout(function () {
            onAuthStateChanged(auth, (user) => {
                if (user != null) {
                    navigation.navigate("HomeScreen");
                } else {
                    navigation.navigate("LoginScreen");
                }
            });
        }, 4000); // CHANGE to 10000 for production
    }

    async _loadFontsAsync() {
        await Font.loadAsync({
            "optician-sans": require("../assets/fonts/Optician-Sans.otf"),
            "tenor-sans": require("../assets/fonts/TenorSans-Regular.ttf"),
        });
        this.setState({ fontsLoaded: true });
    }

    fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(this.state.fontOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(this.state.fontOpacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    componentDidMount() {
        this._loadFontsAsync();
        this.NavtoAuthOrHome(this.props.navigation);
        setTimeout(this.fadeOut, 1000);
        const timer = setTimeout(
            () =>
                this.setState({
                    text: "a gentle reminder that no matter what you feel, you are not alone",
                    fontName: "tenor-sans",
                    fontSize: 24,
                }),

            2000
        );
        setTimeout(this.fadeIn, 4000);
        // setTimeout(() => {
        //     this.nav();
        // }, 1000); // CHANGE TO 10000 FOR PRODUCTION
    }

    render() {
        if (!this.state.fontsLoaded) {
            return null;
        }
        return (
            <Animated.View
                style={{
                    flex: 1,
                    backgroundColor: "#FCFCFF",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: this.state.fontOpacity,
                }}
            >
                <Text
                    style={{
                        fontFamily: this.state.fontName,
                        fontSize: this.state.fontSize,
                        color: "#5C5C5C",
                        textAlign: "center",
                    }}
                >
                    {this.state.text}
                </Text>
            </Animated.View>
        );
    }
}
