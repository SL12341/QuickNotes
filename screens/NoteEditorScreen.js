import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import EditorViewModel from '../viewmodels/EditorViewModel';

export default function NoteEditorScreen({ navigation, route }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [noteIndex, setNoteIndex] = useState(-1);
  const viewModel = new EditorViewModel();

  useEffect(() => {
    if (route.params?.note) {
      setTitle(route.params.note.title);
      setContent(route.params.note.content);
      setNoteIndex(route.params.index);
    }
  }, [route.params]);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Title cannot be empty');
      return;
    }

    try {
      await viewModel.saveNote(title, content, noteIndex);
      navigation.goBack();
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Error', 'Failed to save note.');
    }
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
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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
