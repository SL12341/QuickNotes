import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import NoteEditorScreen from './screens/NoteEditorScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="QuickNotes" component={HomeScreen} />
        <Stack.Screen name="Edit Note" component={NoteEditorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
