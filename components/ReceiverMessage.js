import { View, Text, Image } from "react-native";
import React from "react";

export default function RecieverMessage({ message }) {
  return (
    <View
      style={{
        backgroundColor: "#ff6699",
        marginLeft: 50,
        padding: 10,
        alignSelf: "flex-start",
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 15,
        borderTopLeftRadius: 0,
      }}
    >
      <Image
        style={{
          width: 40,
          height: 40,
          position: "absolute",
          top: 0,
          left: -50,
          borderRadius: 100,
        }}
        source={{ uri: message.photoURL }}
      />
      <Text style={{ color: "white" }}>{message.message}</Text>
    </View>
  );
}
