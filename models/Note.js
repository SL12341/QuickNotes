import uuid from 'react-native-uuid';

export default class Note {
  constructor(title, content, timestamp = new Date().toISOString(), id = uuid.v4()) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.timestamp = timestamp;
  }
}
