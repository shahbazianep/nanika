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
    FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect, useContext } from "react";
import { COLORS } from "../assets/constants";
import { db } from "../firebaseConfig.js";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    where,
    onSnapshot,
    arrayUnion,
    updateDoc,
} from "firebase/firestore";

export default function ClusterScreen({ route, navigation }) {
    const [clusterList, setClusterList] = useState([]);
    const [query, setQuery] = useState("");
    const [userClusterList, setUserClusterList] = useState([]);

    async function joinCluster(cluster) {
        setUserClusterList((prev) => [...prev, cluster.id]);
        // updateDoc(doc(db, "users", route.params.userID), {
        //     clusters: arrayUnion({
        //         name: cluster.name,
        //         type: cluster.type,
        //         id: cluster.id,
        //         members: cluster.members,
        //     }),
        // });
        // alert("joined" + cluster.name);
    }

    function createUserClusterList() {
        setUserClusterList([]);
        route.params.clusters.forEach((d) => {
            setUserClusterList((prev) => [...prev, d.id]);
        });
    }

    useEffect(() => {
        createUserClusterList();
        const fetchClusterData = async () => {
            const clusterQuery = await getDocs(collection(db, "clusters"));
            clusterQuery.forEach((doc) => {
                setClusterList((prevState) => [
                    ...prevState,
                    {
                        name: doc.data().name,
                        members: doc.data().members,
                        id: doc.data().id,
                        type: doc.data().type,
                    },
                ]);
            });
        };
        setClusterList([]);
        fetchClusterData();
    }, [navigation]);

    if (!clusterList || userClusterList.length == 0) {
        return <View></View>;
    }
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
                        navigation.navigate("HomeScreen");
                    }}
                >
                    <MaterialIcons
                        name="arrow-back"
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
                            backgroundColor: COLORS.white,
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
                                    color: COLORS.darkGrey,
                                }}
                            >
                                Join or create a cluster:
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
                                    borderBottomColor: COLORS.darkGrey,
                                    padding: 10,
                                    fontSize: 16,
                                    fontFamily: "tenor-sans",
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    backgroundColor: COLORS.lightGrey,
                                }}
                                value={query}
                                onChangeText={(t) => setQuery(t)}
                            />
                            <TouchableOpacity
                                underlayColor={"transparent"}
                                style={{
                                    padding: 5,
                                    backgroundColor: COLORS.black,
                                    borderRadius: 10,
                                    height: 52,
                                    width: 52,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <MaterialIcons
                                    name="arrow-forward"
                                    size={32}
                                    color={COLORS.white}
                                />
                            </TouchableOpacity>
                        </View>

                        <ScrollView>
                            {clusterList.map((cluster, index) => (
                                <View
                                    key={index}
                                    style={{
                                        borderColor: userClusterList.includes(
                                            cluster.id
                                        )
                                            ? COLORS.darkPeriwinkle
                                            : COLORS.black,
                                        borderWidth: 1,
                                        borderRadius: 3,
                                        paddingLeft: 20,
                                        marginHorizontal: 12,
                                        marginVertical: 6,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        height: 60,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "column",
                                            marginLeft: 20,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: "tenor-sans",
                                                fontSize: 22,
                                                textAlignVertical: "center",
                                                color: COLORS.darkGrey,
                                            }}
                                        >
                                            {cluster.name}
                                        </Text>
                                        <Text
                                            style={{
                                                fontFamily: "optician-sans",
                                                color: COLORS.mediumGrey,
                                                fontSize: 14,
                                                alignSelf: "center",
                                            }}
                                        >
                                            {cluster.members} members
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            width: 60,
                                            height: 25,
                                            borderTopRightRadius: 3,
                                            borderTopLeftRadius: 3,
                                            position: "absolute",
                                            left: -18,
                                            transform: [{ rotate: "-90deg" }],
                                            backgroundColor:
                                                userClusterList.includes(
                                                    cluster.id
                                                )
                                                    ? COLORS.darkPeriwinkle
                                                    : COLORS.black,
                                            padding: 5,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                textAlign: "center",
                                                fontFamily: "optician-sans",
                                                color: COLORS.white,
                                                fontSize: 16,
                                            }}
                                        >
                                            #{cluster.id}
                                        </Text>
                                    </View>

                                    <TouchableOpacity
                                        underlayColor={"transparent"}
                                        style={{
                                            padding: 5,
                                            backgroundColor:
                                                userClusterList.includes(
                                                    cluster.id
                                                )
                                                    ? COLORS.darkPeriwinkle
                                                    : COLORS.black,
                                            borderTopRightRadius: 2,
                                            borderBottomRightRadius: 2,
                                            height: "104%",
                                            width: 60,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            position: "absolute",
                                            alignSelf: "center",
                                            right: -1,
                                        }}
                                        disabled={
                                            userClusterList.includes(cluster.id)
                                                ? true
                                                : false
                                        }
                                        onPress={() => {
                                            joinCluster(cluster);
                                        }}
                                    >
                                        <MaterialIcons
                                            name={
                                                userClusterList.includes(
                                                    cluster.id
                                                )
                                                    ? "check"
                                                    : "add"
                                            }
                                            size={16}
                                            color={COLORS.white}
                                        />
                                    </TouchableOpacity>
                                </View>
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
