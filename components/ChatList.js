import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";

export default function ChatList() {
  const [matches, setMatches] = useState([]);
  const { user } = useAuth();

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matched"),
          where("usersMatched", "array-contains", user.uid)
        ),
        (snapshot) =>
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [user]
  );


  return matches.length > 0 ? (
        <FlatList
            style={{height: '100%'}}
            data={matches}
            keyExtractor={(item)=> item.id}
            renderItem={({item}) => <ChatRow matchDetails={item} />}
        />
    ) : (
        <View style={{marginTop: 20}}>
            <Text style={{textAlign: 'center', fontSize: 20}}>No macthes at the moment.</Text>
        </View>
    )
  ;
}
