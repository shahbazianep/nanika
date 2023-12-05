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
import {
    MOOD_COLORS,
    MOOD_BORDER_COLORS,
    EMOTIONS,
    COLORS,
} from "../assets/constants";
import { useRef, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig.js";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    where,
    onSnapshot,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";

import Cluster from "../components/Cluster";
import arrow from "../assets/arrow.svg";
import { randInt } from "three/src/math/MathUtils";

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
            journalNum: String(
                Object.keys(userData.journals).length + 1
            ).padStart(3, "0"),
            userID: auth.currentUser.uid,
        });
    }

    useEffect(() => {
        const userID = auth.currentUser.uid;
        const fetchUserData = () => {
            const userQuery = onSnapshot(doc(db, "users", userID), (doc) => {
                setUserData(doc.data());
            });
        };

        const fetchClusterData = async () => {
            const clusterQuery = await getDocs(collection(db, "clusters"));
            clusterQuery.forEach((doc) => {
                var docID = doc.id;
                clusterData[docID] = doc.data().memberEmotions;
                setClusterData({ ...clusterData });
            });
        };
        fetchUserData();
        fetchClusterData();
    }, [navigation]);

    if (!loaded || userData == null || clusterData == {}) {
        return null;
    }

    // randEmotion = () => {
    //     const ems = ["Joyful", "Calm", "Anxious", "Upset", "Sad"];
    //     var test = [];
    //     for (let i = 0; i < 60; i++) {
    //         test.push(ems[randInt(0, 4)]);
    //     }
    //     console.log(test);
    //     return test;
    // };

    return (
        <View
            style={{
                flex: 1,
                flexDirection: "column",
                backgroundColor: COLORS.white,
            }}
        >
            <View
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: 90,
                    backgroundColor: COLORS.white,
                    flexDirection: "row",
                    paddingTop: 40,
                    justifyContent: "center",
                    borderBottomWidth: 1,
                    borderColor: COLORS.darkGrey,
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
                        // await updateDoc(doc(db, "clusters", "526"), {
                        //     memberEmotions: randEmotion(),
                        // });
                        navigation.navigate("CalendarScreen", {
                            journals: userData.journals,
                        });
                    }}
                >
                    <MaterialIcons
                        name="calendar-today"
                        size={24}
                        color={COLORS.black}
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
                        navigation.navigate("ClusterScreen", {
                            userID: auth.currentUser.uid,
                            clusters: userData.clusters,
                        });
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
                                color: COLORS.darkGrey,
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
                                color={COLORS.darkGrey}
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
                                    color: COLORS.darkGrey,
                                    textAlign: "center",
                                }}
                            >
                                {userData.clusters[currCluster].name}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: "optician-sans",
                                    fontSize: 16,
                                    color: COLORS.mediumGrey,
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
                                color={COLORS.darkGrey}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <View
                style={{
                    backgroundColor: COLORS.white,
                    position: "absolute",
                    height: 300,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    borderWidth: 1,
                    borderColor: COLORS.darkGrey,
                }}
            >
                <View
                    style={{
                        height: 5,
                        backgroundColor: "transparent",
                        width: 60,
                        alignSelf: "center",
                        marginTop: 22,
                        borderRadius: 3,
                    }}
                />
                <Text
                    style={{
                        marginLeft: 20,
                        marginVertical: 10,
                        fontFamily: "optician-sans",
                        fontSize: 16,
                        color: COLORS.mediumGrey,
                    }}
                >
                    {"Journal " +
                        String(
                            Object.keys(userData.journals).length + 1
                        ).padStart(3, "0")}
                </Text>
                <Text
                    style={{
                        marginVertical: 10,
                        marginLeft: 20,
                        fontFamily: "tenor-sans",
                        fontSize: 24,
                        color: COLORS.darkGrey,
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
                    {EMOTIONS.map((emotion, index) => (
                        <MoodCircle
                            color={MOOD_COLORS[emotion][0]}
                            clickFunction={() => navJournal(emotion)}
                            title={emotion}
                            borderColor={MOOD_BORDER_COLORS[emotion][0]}
                            textColor={COLORS.mediumGrey}
                            key={index}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
}
