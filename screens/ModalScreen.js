import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import { db } from "../firebase";
import { doc, getDoc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import ImageUploader from "../components/ImageUploader";

export default function ModalScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  const inCompleteProfile = !image || !imageURL || !job || !age || !(age >= 18);

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: imageURL,
      job: job,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // useEffect(() => {
  //   let unsub;

  //   const userDetails = await getDoc(doc(db, "users", user.uid)).then((snapshot) => console.log(snapshot.doc.data()))
    
  //   return unsub
  // }, [])

  useEffect(
    () => {
      const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        // console.log(doc.data())
        if (doc.exists()){
          setImage(doc.data().photoURL)
          setJob(doc.data().job)
          setAge(doc.data().age)
        }
    });
    return unsub
  },
    []
  );
  

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", paddingTop: 20 }}>
      <Image
        style={{ width: "100%", height: 60 }}
        resizeMode="contain"
        source={require("../assets/Logos/Tinder-Logo.png")}
      />

      <Text style={{ fontSize: 16, fontWeight: "bold", paddingTop: 20 }}>
        Welcome {user.displayName}
      </Text>
      <Text style={{ paddingTop: 20, color: "rgba(255,0,0,0.4)" }}>
        Step 1: The Profile Pic.
      </Text>
      <ImageUploader image={image} setImage={setImage} setImageURL={setImageURL} />
      {/* <TextInput
        value={image}
        onChangeText={setImage}// this invokes set state and sets the text automatically. 
        placeholder="Enter your image url"
        style={{ fontSize: 16, paddingTop: 20, textAlign: "center" }}
      /> */}
      <Text style={{ paddingTop: 20, color: "rgba(255,0,0,0.4)" }}>
        Step 2: The Occupation.
      </Text>
      <TextInput
        value={job}
        onChangeText={setJob}
        placeholder="Enter your occupation"
        style={{ fontSize: 16, paddingTop: 20, textAlign: "center" }}
      />
      <Text style={{ paddingTop: 20, color: "rgba(255,0,0,0.4)" }}>
        Step 3: The Age.
      </Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        placeholder="Enter your age"
        style={{ fontSize: 16, paddingTop: 20, textAlign: "center" }}
        keyboardType="numeric"
        minLength={2}
        maxLength={2}
      />

      <TouchableOpacity
        disabled={inCompleteProfile}
        style={[
          {
            backgroundColor: "rgba(255,0,0,0.4)",
            position: "absolute",
            bottom: 20,
            borderRadius: 10,
          },
          inCompleteProfile
            ? { backgroundColor: "rgba(0,0,0,0.4)" }
            : { backgroundColor: "rgba(255,0,0,0.4)" },
        ]}
        onPress={updateUserProfile}
      >
        <Text
          style={{ paddingVertical: 15, paddingHorizontal: 60, color: "white" }}
        >
          Update Profile
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
