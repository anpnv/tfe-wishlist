import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Product } from './product';
import { User } from './User';

export class List {
  id?: String;
  isPublic?: boolean;
  date?: String;
  pot?: number;
  authorId?: String;
  isEnable?: boolean;
  name?: String;
  products?: [];
  messages?: [];

  constructor(data: List) {
    const {
      id,
      isPublic,
      date,
      pot,
      authorId,
      isEnable,
      name,
      products,
      messages,
    } = data;
    this.id = id;
    this.isPublic = isPublic;
    this.date = date;
    this.pot = pot;
    this.authorId = authorId;
    this.isEnable = isEnable;
    this.name = name;
    this.products = products;
    this.messages = messages;
  }
}
