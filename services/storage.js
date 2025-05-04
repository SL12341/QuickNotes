import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'NOTES';

export async function getNotes() {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveNotes(notes) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}
