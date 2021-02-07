export class List {
  id: string;
  isPublic: boolean;
  date: string;
  pot: number;
  authorId: string;
  isEnable: boolean;
  name: string;

  constructor(data: List) {
    const { id, isPublic, date, pot, authorId, isEnable, name } = data;
    this.id = id;
    this.isPublic = isPublic;
    this.date = date;
    this.pot = pot;
    this.authorId = authorId;
    this.isEnable = isEnable;
    this.name = name;
  }
}
