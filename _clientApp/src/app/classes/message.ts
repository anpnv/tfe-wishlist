export class Message {
  id: string;
  authorId: string;
  listId: string;
  details: string;
  time: string;

  constructor(data: Message) {
    const { id, authorId, listId, details, time } = data;
    this.id = id;
    this.authorId = authorId;
    this.listId = listId;
    this.details = details;
    this.time = time;
  }
}
