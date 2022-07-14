import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import generateId from "../lib/generateId";

// This was a dummy data for beggining the project
// const dummyData = [
//   {
//     firstName: "Jeff",
//     lastName: "Bezos",
//     occupation: "Fouder of Amazon",
//     photoURL:
//       "https://thumbor.forbes.com/thumbor/190x190/smart/filters:format(jpeg)/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5bb22ae84bbe6f67d2e82e05%2F416x416.jpg%3Fbackground%3D000000%26cropX1%3D627%26cropX2%3D1639%26cropY1%3D129%26cropY2%3D1142",
//     age: "68",
//     id: "132",
//   },
 
// ];

export default function HomeScreen() {
  const navigation = useNavigation();
  const { logout, user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);
  const [userProfileImage, setUserProfileImage] = useState(null);
  // used for referencing a component and using is functions or basicliy controlling its functionality.

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("Modal");
        }
      }),
    []
  );

  useEffect(
    () => onSnapshot(doc(db, "users", user.uid), (doc) => {
        // console.log(doc.data())
        if (doc.exists()){
          setUserProfileImage(doc.data().photoURL)
          console.log(doc.data().photoURL)
        }
    })
   ,
    []
  );

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const matches = await getDocs(
        collection(db, "users", user.uid, "matches")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const matchedUserIds = matches.length > 0 ? matches : ["test"];

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...matchedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };
    fetchCards();
    return unsub;
  }, []);

  const swipedLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`user swiped PASS on ${userSwiped.displayName}`);

    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };

  const swipedRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`user swiped MATCH on ${userSwiped.displayName}`);

    const loggedInUserProfile = await (
      await getDoc(doc(db, "users", user.uid))
    ).data();

    // check if the user swiped on you...
    getDoc(doc(db, "users", userSwiped.id, "matches", user.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          // user has matched with you before you had matched with them.
          // Create a MATCH
          console.log(`hooray you MATCHED with ${userSwiped.displayName}`);
          setDoc(
            doc(db, "users", user.uid, "matches", userSwiped.id),
            userSwiped
          );

          // storing matched users data separately
          setDoc(doc(db, "matched", generateId(user.uid, userSwiped.id)), {
            user: {
              [user.uid]: loggedInUserProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });

          navigation.navigate("Match", {
            loggedInUserProfile,
            userSwiped,
          });
        } else {
          // user has swiped as first interaction between two or did not get swiped.
          console.log(`you swiped on ${userSwiped.displayName}`);
          setDoc(
            doc(db, "users", user.uid, "matches", userSwiped.id),
            userSwiped
          );
        }
      }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* header starts here */}
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={logout}>
          <Image
            style={{ width: 30, height: 30, borderRadius: 50 }}
            source={{ uri: userProfileImage }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image
            style={{ width: 40, height: 50 }}
            source={require("../assets/Logos/tinder.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color={"#fd3974"} />
        </TouchableOpacity>
      </View>
      {/* header ends here */}

      {/* cards starts here  */}

      <View style={{ flex: 1, marginTop: -20 }}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            console.log(cardIndex, "ye nahi");
            swipedLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log(cardIndex, "ye hi");
            swipedRight(cardIndex);
          }}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  position: "absolute",
                  textAlign: "right",
                  color: "red",
                  fontSize: 30,
                  fontWeight: "bold",
                  // top:20,
                  right: 20,
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  position: "absolute",
                  color: "green",
                  fontSize: 30,
                  fontWeight: "bold",
                  // top:20,
                  left: 20,
                },
              },
            },
          }}
          renderCard={(card) =>
            card ? (
              <View
                key={card.id}
                style={{
                  position: "relative",
                  backgroundColor: "white",
                  height: "75%",
                  borderRadius: 20,
                }}
              >
                <Image
                  style={{
                    position: "absolute",
                    top: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: 20,
                  }}
                  source={{ uri: card.photoURL }}
                />
                <View
                  style={[
                    {
                      position: "absolute",
                      backgroundColor: "white",
                      flexDirection: "row",
                      width: "100%",
                      height: "15%",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 20,
                      bottom: 0,
                      borderBottomLeftRadius: 20,
                      borderBottomRightRadius: 20,
                    },
                    styles.cardBoxShadow,
                  ]}
                >
                  <View>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                      {card.displayName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    {card.age}
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={[
                  {
                    position: "relative",
                    backgroundColor: "white",
                    height: "75%",
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  styles.cardBoxShadow,
                ]}
              >
                <Text style={{ fontWeight: "bold", marginBottom: 20 }}>
                  No more profiles
                </Text>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={require("../assets/Logos/cryingEmoji.png")}
                />
              </View>
            )
          }
        />
      </View>
      {/* cards ends here  */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "rgba(255, 0, 0, 0.21)",
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
          }}
          onPress={() => swipeRef.current.swipeLeft()}
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "rgba(0, 255, 0, 0.21)",
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
          }}
          onPress={() => swipeRef.current.swipeRight()}
        >
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardBoxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.4,
    elevation: 2,
  },
});
