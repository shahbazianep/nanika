import React, { useState, useEffect } from "react";
import {
    TextInput,
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
} from "react-native";
import * as Keychain from "react-native-keychain";
import { collection, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig.js";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    function handleEmailChange(newText) {
        setEmail(newText);
        setEmailError("");
    }

    function handlePasswordChange(newText) {
        setPassword(newText);
        setPasswordError("");
    }

    function checkEmail(email) {
        //let reg = new RegExp("^w+([.-]?w+)*@w+([.-]?w+)*(.ww+)+$");
        let reg = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
        if (!reg.test(email)) {
            setEmailError("Invalid email address.");
        } else {
            setEmailError("");
        }
    }

    function checkPassword(password) {
        let reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{7,})");
        if (!reg.test(password)) {
            setPasswordError(
                "Password must be 7-15 characters, and include an uppercase character, lowercase character, and digit."
            );
        } else {
            setPasswordError("");
        }
    }

    function handleLogin(e, p) {
        checkEmail(e);
        checkPassword(p);
        if (!emailError && !passwordError) {
            login(e, p);
        }
    }

    function login(e, p) {
        //const auth = getAuth();
        createUserWithEmailAndPassword(auth, e, p)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const d = collection(db, "users");
                await setDoc(doc(d, user.uid), {
                    userEmail: user.email,
                    clusters: [],
                    journals: [],
                });
                alert("logging in as " + user.uid);
            })
            .catch((error) => {
                if (error.code == "auth/email-already-in-use") {
                    setEmailError(
                        "Email already in use. Please use a different email address."
                    );
                }
                console.log("Login error", error);
            });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, backgroundColor: "transparent" }}
            keyboardVerticalOffset={-100}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                    style={{
                        display: "flex",
                        flex: 1,
                        alignContent: "center",
                        justifyContent: "center",
                        padding: 40,
                        backgroundColor: "#FCFCFF",
                    }}
                >
                    <TextInput
                        placeholder={"Email"}
                        textContentType={"emailAddress"}
                        keyboardType={"email-address"}
                        onChangeText={(newText) => handleEmailChange(newText)}
                        value={email}
                        style={{
                            padding: 10,
                            width: 280,
                            backgroundColor: "#ECECFF",
                            borderRadius: 5,
                            alignSelf: "center",
                            fontFamily: "tenor-sans",
                            fontSize: 18,
                            marginBottom: 4,
                            textAlign: "center",
                        }}
                    />
                    <View>
                        <Text
                            style={{
                                fontFamily: "optician-sans",
                                fontSize: 12,
                                color: "red",
                                marginLeft: 12,
                            }}
                        >
                            {emailError}
                        </Text>
                    </View>
                    <TextInput
                        placeholder={"Password"}
                        textContentType={"newPassword"}
                        secureTextEntry={true}
                        onChangeText={(newText) =>
                            handlePasswordChange(newText)
                        }
                        passwordRules={
                            "minlength: 7; maxlength: 15; required: lower; required: upper; required: digit;"
                        }
                        value={password}
                        style={{
                            padding: 10,
                            width: 280,
                            marginTop: emailError ? 16 : 0,
                            marginBottom: 4,
                            backgroundColor: "#ECECFF",
                            borderRadius: 5,
                            alignSelf: "center",
                            fontFamily: "tenor-sans",
                            fontSize: 18,
                            textAlign: "center",
                        }}
                    />
                    <View>
                        <Text
                            style={{
                                fontFamily: "optician-sans",
                                fontSize: 12,
                                color: "red",
                                marginLeft: 12,
                            }}
                        >
                            {passwordError}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#ECECFF",
                            padding: 10,
                            width: 120,
                            borderRadius: 5,
                            margin: passwordError ? 20 : 10,
                            alignItems: "center",
                            alignSelf: "center",
                        }}
                        onPress={() => handleLogin(email, password)}
                    >
                        <Text
                            style={{
                                fontFamily: "optician-sans",
                                fontSize: 24,
                                textAlign: "center",
                                color: "#5C5C5C",
                            }}
                        >
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
