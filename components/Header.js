import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Foundation, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Header({title, callEnabled}) {
    const navigation = useNavigation();

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between' , alignItems: 'center', padding: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={ () => navigation.goBack() }>
                <Ionicons name="chevron-back-outline" size={34} color="#fd3974" />
            </TouchableOpacity>
            <Text style={{fontSize: 26 , fontWeight: 'bold', paddingLeft: 10 }}>{title}</Text>
        </View>
        {callEnabled && (
            <TouchableOpacity style={{borderRadius: 50, marginRight: 10, backgroundColor: '#ffcccc', paddingHorizontal: 10, paddingVertical: 5}}>
                <Foundation name="telephone" size={30} color="red" />
            </TouchableOpacity>
        )}
    </View>
  )
}