import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import HomeViewModel from '../viewmodels/HomeViewModel';

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const viewModel = new HomeViewModel();

  const load = async () => {
    const data = await viewModel.loadNotes();
    setNotes([...data]);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', load);
    return unsubscribe;
  }, [navigation]);

  const confirmDelete = (index) => {
    Alert.alert(
      'Delete Note',
      'Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedNotes = await viewModel.deleteNote(index);
            setNotes([...updatedNotes]);
          },
        },
      ]
    );
  };

  const renderNote = ({ item, index }) => (
    <TouchableOpacity
      style={styles.noteCard}
      onPress={() => navigation.navigate('Edit Note', { note: item, index })}
      onLongPress={() => confirmDelete(index)}
    >
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.notePreview} numberOfLines={2}>{item.content}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 My Notes</Text>
      <FlatList
        data={notes}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderNote}
        contentContainerStyle={styles.list}
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
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  list: { paddingBottom: 80 },
  noteCard: {
    backgroundColor: '#fff', padding: 16, borderRadius: 12,
    marginBottom: 12, elevation: 2,
  },
  noteTitle: { fontSize: 18, fontWeight: 'bold' },
  notePreview: { fontSize: 14, color: '#666', marginTop: 4 },
  addButton: {
    position: 'absolute', bottom: 30, right: 20,
    backgroundColor: '#007AFF', width: 60, height: 60,
    borderRadius: 30, justifyContent: 'center', alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 32 },
});
