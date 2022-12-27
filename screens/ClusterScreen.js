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
    ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MoodCircle from "../components/MoodCircle";
import { useState, useEffect, useContext } from "react";
import { moodColors, moodBorderColors, emotions } from "../assets/constants";
import { useCallback } from "react";
import { db } from "../firebaseConfig.js";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    where,
    onSnapshot,
} from "firebase/firestore";

export default function ClusterScreen({ route, navigation }) {
    const [clusterList, setClusterList] = useState([]);
    const test = ["hello", "yes", "hello"];

    useEffect(() => {
        const fetchClusterData = async () => {
            const clusterQuery = await getDocs(collection(db, "clusters"));
            clusterQuery.forEach((doc) => {
                setClusterList((prevState) => [
                    ...prevState,
                    {
                        name: doc.data().name,
                        members: doc.data().members,
                        id: doc.data().id,
                    },
                ]);
            });
        };
        setClusterList([]);
        fetchClusterData();
    }, []);

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
                    Clusters
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
                            paddingTop: 100,
                        }}
                    >
                        <View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: "tenor-sans",
                                    marginLeft: 12,
                                    color: "#5C5C5C",
                                }}
                            >
                                Search for or create a cluster:
                            </Text>
                        </View>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                padding: 12,
                                marginBottom: 20,
                            }}
                        >
                            <TextInput
                                style={{
                                    height: 52,
                                    marginRight: 18,
                                    width: 270,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#484848",
                                    padding: 10,
                                    fontSize: 16,
                                    fontFamily: "tenor-sans",
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    backgroundColor: "#D9D9D9",
                                }}
                            />
                            <TouchableOpacity
                                underlayColor={"transparent"}
                                style={{
                                    padding: 5,
                                    backgroundColor: "black",
                                    borderRadius: 10,
                                    height: 52,
                                    width: 52,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                onPress={() => {
                                    // queryLists();
                                }}
                            >
                                <MaterialIcons
                                    name="arrow-forward"
                                    size={32}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>

                        <ScrollView>
                            {clusterList.map((cluster, index) => (
                                <TouchableOpacity
                                    key={index}
                                    underlayColor={"transparent"}
                                    style={{
                                        borderColor: "black",
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        padding: 20,
                                        marginHorizontal: 12,
                                        marginVertical: 6,
                                        flexDirection: "row",
                                        alignContent: "center",
                                    }}
                                    onPress={() => {
                                        // queryLists();
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: "tenor-sans",
                                            fontSize: 20,
                                            textAlign: "center",
                                            textAlignVertical: "center",
                                            color: "#5C5C5C",
                                        }}
                                    >
                                        {cluster.name}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: "optician-sans",
                                            color: "#A6A6AD",
                                            fontSize: 16,
                                            alignSelf: "center",
                                            position: "absolute",
                                            padding: 20,
                                            right: 0,
                                        }}
                                    >
                                        {cluster.members} members
                                    </Text>
                                </TouchableOpacity>
                            ))}
                            <View>
                                <View style={{ height: 150 }}></View>
                            </View>
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
}
