import { getNotes, saveNotes } from '../services/storage';

export default class HomeViewModel {
  async loadNotes() {
    return await getNotes(); // load fresh each time
  }

  async deleteNoteById(id) {
    const notes = await getNotes(); // get current notes
    const updatedNotes = notes.filter(n => n.id !== id); // filter out the note by ID
    await saveNotes(updatedNotes); // save updated notes
    return updatedNotes; // return the new list
  }
}
