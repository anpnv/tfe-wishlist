export class User {
  id?: String;
  displayName?: String;
  email?: String;
  birthday?: String;
  token?: String;

  constructor(data: User) {
    const { id, displayName, email, birthday, token } = data;
    this.id = id;
    this.displayName = displayName;
    this.email = email;
    this.birthday = birthday;
    this.token = token;
  }
}
