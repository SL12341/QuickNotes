import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadNotes);
    return unsubscribe;
  }, [navigation]);

  const loadNotes = async () => {
    const data = await AsyncStorage.getItem('NOTES');
    setNotes(data ? JSON.parse(data) : []);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Create New Note" onPress={() => navigation.navigate('Edit Note')} />
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Edit Note', { note: item, index })}>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
