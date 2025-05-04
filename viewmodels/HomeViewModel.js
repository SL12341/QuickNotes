import { getNotes, saveNotes } from '../services/storage';

export default class HomeViewModel {
  constructor() {
    this.notes = [];
  }

  async loadNotes() {
    this.notes = await getNotes();
    return this.notes;
  }

  async deleteNote(index) {
    this.notes.splice(index, 1);
    await saveNotes(this.notes);
    return this.notes;
  }
}
