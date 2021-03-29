export class User {
  uid?: String;
  displayName?: String;
  email?: String;
  birthday?: String;
  token?: String;
  privateList?: String;
  publicLists?: String[];

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
