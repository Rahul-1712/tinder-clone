import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function MatchScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInUserProfile, userSwiped } = params;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fd3974",
        opacity: 0.89,
        paddingHorizontal: 20,
        paddingTop: 130,
      }}
    >
      <View style={{ justifyContent: "center", paddingTop: 20 }}>
        <Image
          style={{ height: 80, width: "100%" }}
          source={require("../assets/Logos/itsamatch.png")}
        />
      </View>

      <Text style={{ color: "white", textAlign: "center", marginTop: 10 }}>
        You and {userSwiped.displayName} have liked each other.
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 50,
          border: "black",
        }}
      >
        <Image
          style={{
            height: 130,
            width: 130,
            borderRadius: 100,
          }}
          source={{ uri: loggedInUserProfile.photoURL }}
        />
        <Image
          style={{
            height: 130,
            width: 130,
            borderRadius: 100,
          }}
          source={{ uri: userSwiped.photoURL }}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          paddingHorizontal: 50,
          paddingVertical: 20,
          borderRadius: 100,
          marginTop: 70,
        }}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text style={{ textAlign: "center" }}>Send a message</Text>
      </TouchableOpacity>
    </View>
  );
}
