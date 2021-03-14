export interface User {
  uid: String;
  displayName?: String;
  email?: String;
  birthday?: String;
  token?: String;
  privateList?: number;
  publicLists?: [];
}
