import { useFonts } from "expo-font";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MoodCircle from "../components/MoodCircle";
import { moodColors, moodBorderColors, emotions } from "../assets/constants";
import { useRef, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig.js";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    where,
    onSnapshot,
} from "firebase/firestore";

import Cluster from "../components/Cluster";
import arrow from "../assets/arrow.svg";

export default function HomeScreen({ route, navigation }) {
    const [loaded] = useFonts({
        "optician-sans": require("../assets/fonts/Optician-Sans.otf"),
    });

    const [userData, setUserData] = useState(null);
    const [clusterData, setClusterData] = useState({});
    const [currCluster, setCurrCluster] = useState(0);

    function navJournal(emotion) {
        navigation.navigate("JournalScreen", {
            pressedEmotion: emotion,
        });
    }

    useEffect(() => {
        const userID = auth.currentUser.uid;
        const fetchUserData = async () => {
            const userQuery = await getDoc(doc(db, "users", userID));
            setUserData(userQuery.data());
        };

        const fetchClusterData = async () => {
            //setClusterData({});
            const clusterQuery = await getDocs(collection(db, "clusters"));
            clusterQuery.forEach((doc) => {
                var docID = doc.id;
                clusterData[docID] = doc.data().memberEmotions;
                setClusterData({ ...clusterData });
            });
        };
        fetchUserData();
        fetchClusterData();
    }, []);

    if (!loaded || userData == null || clusterData == {}) {
        return null;
    }

    return (
        <View
            style={{
                flex: 1,
                flexDirection: "column",
                backgroundColor: "#F7F7FF",
            }}
        >
            <View
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: 90,
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
                        navigation.navigate("CalendarScreen", {
                            journals: userData.journals,
                        });
                    }}
                >
                    <MaterialIcons
                        name="calendar-today"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>

                <Text
                    style={{
                        fontFamily: "optician-sans",
                        fontSize: 32,
                        alignSelf: "center",
                    }}
                >
                    Home
                </Text>
                <TouchableOpacity
                    underlayColor={"transparent"}
                    style={{
                        position: "absolute",
                        right: 33,
                        padding: 5,
                        top: 33,
                    }}
                    onPress={() => {
                        navigation.navigate("ClusterScreen");
                    }}
                >
                    <MaterialIcons
                        name="add-circle-outline"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flexDirection: "column",
                    alignItems: "center",
                    alignSelf: "center",
                    justifyContent: "center",
                    marginTop: 100,
                }}
            >
                {userData.clusters.length == 0 ? (
                    <View
                        style={{
                            flex: 0.5,
                            padding: 20,
                            margin: 20,
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 24,
                                fontFamily: "tenor-sans",
                                textAlign: "center",
                                color: "#5C5C5C",
                            }}
                        >
                            Uh-oh. You aren't a member of any clusters. Join
                            some here!
                        </Text>
                        <Image
                            source={arrow}
                            style={{ position: "absolute" }}
                        />
                    </View>
                ) : (
                    <View style={{ height: 300, width: 400 }}>
                        <Cluster
                            data={{
                                members: userData.clusters[currCluster].members,
                                emotions:
                                    clusterData[
                                        userData.clusters[currCluster].id
                                    ],
                            }}
                        />
                    </View>
                )}
                {userData.clusters == 0 ? (
                    <View></View>
                ) : (
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            alignSelf: "center",
                            justifyContent: "center",
                        }}
                    >
                        <TouchableOpacity
                            underlayColor={"transparent"}
                            onPress={() => {
                                if (currCluster != 0) {
                                    setCurrCluster(currCluster - 1);
                                } else {
                                    setCurrCluster(
                                        userData.clusters.length - 1
                                    );
                                }
                            }}
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                width: 40,
                                height: 40,
                            }}
                        >
                            <MaterialIcons
                                name="keyboard-arrow-left"
                                size={32}
                                color="#5C5C5C"
                            />
                        </TouchableOpacity>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignContent: "center",
                                alignSelf: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "optician-sans",
                                    fontSize: 32,
                                    color: "#5C5C5C",
                                    textAlign: "center",
                                }}
                            >
                                {userData.clusters[currCluster].name}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: "optician-sans",
                                    fontSize: 16,
                                    color: "#A6A6AD",
                                    textAlign: "center",
                                }}
                            >
                                {userData.clusters[currCluster].type} -{" "}
                                {userData.clusters[currCluster].members} members
                            </Text>
                        </View>

                        <TouchableOpacity
                            underlayColor={"transparent"}
                            onPress={() => {
                                if (
                                    currCluster ==
                                    userData.clusters.length - 1
                                ) {
                                    setCurrCluster(0);
                                } else {
                                    setCurrCluster(currCluster + 1);
                                }
                            }}
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                width: 40,
                                height: 40,
                            }}
                        >
                            <MaterialIcons
                                name="keyboard-arrow-right"
                                size={32}
                                color="#5C5C5C"
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <View
                style={{
                    backgroundColor: "#FCFCFF",
                    position: "absolute",
                    height: 300,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    borderWidth: 1,
                    borderColor: "#CECEDB",
                }}
            >
                <View
                    style={{
                        height: 5,
                        backgroundColor: "#A6A6AD",
                        width: 60,
                        alignSelf: "center",
                        marginTop: 22,
                        borderRadius: 3,
                    }}
                />
                <Text
                    style={{
                        margin: 10,
                        fontFamily: "optician-sans",
                        fontSize: 16,
                        color: "#A6A6AD",
                    }}
                >
                    Journal 001
                </Text>
                <Text
                    style={{
                        margin: 10,
                        fontFamily: "tenor-sans",
                        fontSize: 24,
                        color: "#5C5C5C",
                    }}
                >
                    Today, I'm feeling:
                </Text>
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
                            color={moodColors[emotion][0]}
                            clickFunction={() => navJournal(emotion)}
                            title={emotion}
                            borderColor={moodBorderColors[emotion][0]}
                            textColor={"#A6A6AD"}
                            key={index}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
}
