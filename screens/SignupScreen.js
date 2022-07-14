import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

export default function SignupScreen() {
  const navigation = useNavigation();
  const { signUpWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        resizeMode="cover"
        style={{ flex: 1 }}
        source={require("../assets/Logos/tinder-login-bg-2.png")}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, alignItems: "center" }}
          keyboardVerticalOffset={0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, width: "100%", height: "100%" }}></View>
          </TouchableWithoutFeedback>
          <View
            style={{
              //   position: "absolute",
              //   bottom: "13%",
              //   borderWidth: 2,
              // marginHorizontal: "25%",
              alignItems: "center",
              width: "70%",
              marginBottom: "20%",
            }}
          >
            <TextInput
              style={{
                padding: 10,
                borderRadius: 100,
                backgroundColor: "white",
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginBottom: 10,
                borderColor: "gray",
                borderWidth: 0.5,
                width: "100%",
              }}
              placeholder={"Enter Email Address"}
              onChangeText={setEmail}
            />

            <TextInput
              style={{
                padding: 10,
                borderRadius: 100,
                backgroundColor: "white",
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginBottom: 20,
                borderColor: "gray",
                borderWidth: 0.5,
                width: "100%",
              }}
              placeholder={"Enter Password"}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <TextInput
              style={{
                padding: 10,
                borderRadius: 100,
                backgroundColor: "white",
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginBottom: 20,
                borderColor: "gray",
                borderWidth: 0.5,
                width: "100%",
              }}
              placeholder={"Confirm Password"}
              onChangeText={setCPassword}
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                // position: 'absolute',
                // bottom: "18%",
                marginBottom: 30,
                borderRadius: 100,
                padding: 15,
                width: "100%",
              }}
              onPress={() => {
                if (password === cPassword) {

                  signUpWithEmail(email, password)
                }else{
                  
                }
              }}
            >
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                Sign Up
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Already have an account.
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  textAlign: "center",
                  textDecorationLine: "underline",
                  color: "blue",
                  fontWeight: "bold",
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}
