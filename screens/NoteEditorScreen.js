import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
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
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ fontSize: 20, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Write your note..."
        value={content}
        onChangeText={setContent}
        multiline
        style={{ fontSize: 16, height: 300 }}
      />
      <Button title="Save" onPress={saveNote} />
    </View>
  );
}
