import { getNotes, saveNotes } from '../services/storage';
import Note from '../models/Note'; // ✅ Add this line!

export default class EditorViewModel {
  async saveNote(title, content, existingIndex = -1) {

    const notes = await getNotes();
    const existing = notes[existingIndex];
    const note = new Note(title, content, new Date().toISOString(), existing?.id);

    if (existingIndex >= 0) {
      notes[existingIndex] = note;
    } else {
      notes.push(note);
    }

    await saveNotes(notes);
  }
}
