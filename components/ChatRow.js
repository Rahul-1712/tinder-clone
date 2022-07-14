import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export default function ChatRow({ matchDetails }) {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState({});

  const [lastMessage, setLastMessage] = useState(null)

  useEffect(() => {
    // console.log("set karna chalu kiya");

    setMatchedUserInfo(getMatchedUserInfo(matchDetails.user, user.uid));
    // console.log(matchedUserInfo);
    // console.log("ho gaya set");
  }, [matchDetails, user]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matched", matchDetails.id, "messages"),
          orderBy("timestamp", "desc"),
          limit(1)
        ),
        (snapshot) =>
          setLastMessage(
            snapshot.docs[0]?.data()?.message
          )
      ),
    [matchDetails, user]
  );
  

  return (
    // console.log("render chalu"),
    <TouchableOpacity
      style={[
        {
          backgroundColor: "white",
          flexDirection: "row",
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginVertical: 10,
          marginHorizontal: 10,
          alignItems: "center",
          borderRadius: 10,
        },
        styles.cardBoxShadow,
      ]}
      onPress={() => navigation.navigate("Message", { matchDetails })}
    >
      {/* {console.log("render kiya")} */}
      <Image
        style={{ width: 50, height: 50, borderRadius: 100, marginRight: 20 }}
        source={{ uri: matchedUserInfo?.photoURL }}
      />
      <View>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {matchedUserInfo?.displayName}
        </Text>
        <Text>{lastMessage || "Say hi!"}</Text>
      </View>
    </TouchableOpacity>
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
