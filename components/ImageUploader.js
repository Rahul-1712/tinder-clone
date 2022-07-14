import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
// import ImagePicker from 'react-native-image-crop-picker';
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

export default function ImageUploader(props) {
  const { image, setImage, setImageURL, setTransfered } = props;

  useEffect(() => {
    async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    };
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    const storageRef = ref(storage, new Date().toISOString());

    const imgUri = await fetch(image);
    const bytes = await imgUri.blob();

    // Upload file after converting image uri to blob
    const uploadTask = uploadBytesResumable(storageRef, bytes);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setTransfered(progress);
        // switch (snapshot.state) {
        //   case "paused":
        //     console.log("Upload is paused");
        //     break;
        //   case "running":
        //     console.log("Upload is running");
        //     break;
        // }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageURL(downloadURL);
        });
      }
    );
  };

  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}
    >
      {image ? (
        <Image
          source={{ uri: image }}
          style={{ width: 70, height: 70, borderRadius: 100, marginBottom: 10 }}
        />
      ) : (
        <Image
          source={require("../assets/Logos/user_default_image.png")}
          style={{ width: 70, height: 70, borderRadius: 100, marginBottom: 10 }}
        />
      )}

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={pickImage}>
          <Text style={{ color: "#007FFF", fontWeight: "bold" }}>
            Choose image
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={uploadImage}>
          <Text style={{ color: "#007FFF", fontWeight: "bold" }}>
            Upload image
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
