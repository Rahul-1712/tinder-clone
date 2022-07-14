import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useLayoutEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

export default function LoginScreen() {
  const { signInWithGoogle, loading } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        resizeMode="cover"
        style={{ flex: 1 }}
        source={require("../assets/Logos/tinder-login-bg-2.png")}
      >
        <View
          style={{
            position: "absolute",
            bottom: "18%",
            marginHorizontal: "25%",
          }}
        >
   
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              // position: 'absolute',
              // bottom: "18%",
              // marginHorizontal: "25%",
              borderRadius: 15,
              padding: 15,
            }}
            onPress={() => navigation.navigate('EmailLogin')}
          >
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              Sign in With Your Account
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "white",
              marginVertical: 10,
            }}
          >
            OR
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              // position: 'absolute',
              // bottom: "18%",
              // marginHorizontal: "25%",
              borderRadius: 15,
              padding: 15,
            }}
            onPress={signInWithGoogle}
          >
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              Sign in with Google
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
