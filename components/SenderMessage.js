import { View, Text } from "react-native";
import React from "react";

export default function SenderMessage({ message }) {
  return (
    <View
      style={{
        backgroundColor: "#9933ff",
        marginLeft: "auto",
        padding: 10,
        alignSelf: "flex-start",
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 15,
        borderTopRightRadius: 0,
      }}
    >
      {console.log(message.message)}
      <Text style={{ color: "white", fontSize: 16}}>{message.message}</Text>
    </View>
  );
}
