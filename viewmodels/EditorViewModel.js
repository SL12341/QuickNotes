import { getNotes, saveNotes } from '../services/storage';
import Note from '../models/Note';

export default class EditorViewModel {
  async saveNote(title, content, existingIndex = -1) {
    const notes = await getNotes();
    const note = new Note(title, content);

    if (existingIndex >= 0) {
      notes[existingIndex] = note;
    } else {
      notes.push(note);
    }

    await saveNotes(notes);
  }
}
