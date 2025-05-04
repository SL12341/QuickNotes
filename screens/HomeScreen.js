import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
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

  const renderNote = ({ item, index }) => (
    <TouchableOpacity
      style={styles.noteCard}
      onPress={() => navigation.navigate('Edit Note', { note: item, index })}
      onLongPress={() => handleDeleteNote(index)}
    >
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.notePreview} numberOfLines={2}>{item.content}</Text>
    </TouchableOpacity>
  );  

  const handleDeleteNote = (indexToDelete) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const data = await AsyncStorage.getItem('NOTES');
            const notes = data ? JSON.parse(data) : [];
            notes.splice(indexToDelete, 1);
            await AsyncStorage.setItem('NOTES', JSON.stringify(notes));
            setNotes(notes); // Refresh list
          },
        },
      ]
    );
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 My Notes</Text>
      <FlatList
        data={notes}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderNote}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>No notes yet.</Text>}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Edit Note')}
      >
        <Text style={styles.addButtonText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  list: { paddingBottom: 80 },
  noteCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  noteTitle: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  notePreview: { fontSize: 14, color: '#666', marginTop: 4 },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  addButtonText: { fontSize: 32, color: '#fff' },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 40 },
});
