export interface List {
  id: string;
  isPublic: boolean;
  date: string;
  pot: number;
  authorId: string;
  isEnable: boolean;
  name: string;
  products: [];
  messages: [];
}
