import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NoteEditorScreen({ navigation, route }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (route.params?.note) {
      setTitle(route.params.note.title);
      setContent(route.params.note.content);
    }
  }, []);

  const saveNote = async () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Title is required.');
      return;
    }

    const data = await AsyncStorage.getItem('NOTES');
    const notes = data ? JSON.parse(data) : [];

    if (route.params?.index >= 0) {
      notes[route.params.index] = { title, content };
    } else {
      notes.push({ title, content });
    }

    await AsyncStorage.setItem('NOTES', JSON.stringify(notes));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Note Title"
        value={title}
        onChangeText={setTitle}
        style={styles.titleInput}
      />
      <TextInput
        placeholder="Write your note here..."
        value={content}
        onChangeText={setContent}
        multiline
        style={styles.contentInput}
      />
      <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
        <Text style={styles.saveButtonText}>Save Note</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titleInput: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingVertical: 8,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    textAlignVertical: 'top',
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
