import { List } from './list';

export class User {
  uid?: String;
  displayName?: String;
  email?: String;
  birthday?: String;
  token?: String;
  privateList?: List;
  publicLists?: List[];

  constructor(data: User) {
    const {
      uid,
      displayName,
      email,
      birthday,
      token,
      privateList,
      publicLists,
    } = data;
    this.uid = uid;
    this.displayName = displayName;
    this.email = email;
    this.birthday = birthday;
    this.token = token;
    this.privateList = privateList; 
    this.publicLists = publicLists;
  }
}
