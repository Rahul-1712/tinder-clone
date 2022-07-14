import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import ChatList from '../components/ChatList';

export default function ChatScreen() {

  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Header title="Chats" />
      <ChatList />
    </SafeAreaView>
  );
}
