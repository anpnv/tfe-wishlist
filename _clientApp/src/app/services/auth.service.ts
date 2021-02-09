import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { map, flatMap, switchMap, take } from 'rxjs/operators';
import { User } from '../classes/User';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User;
  rootUrl = 'https://europe-west1-tfe-wishlist.cloudfunctions.net/api/';

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth,
    private navCtrl: NavController
  ) {
    const data = JSON.parse(sessionStorage.getItem('currentUser'));
    this.currentUser = data ? new User(data) : null;
    this.handleRedirect();
  }

  private async handleRedirect() {
    if (this.currentUser) {
      console.log('çapeu direct')
      this.navCtrl.navigateForward('/tabs/home');
    }
  }

  uid() {
    return true;
  }

  login(email, password) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        const { displayName, email, uid } = user.user;
        const usr: User = {
          id: uid,
          displayName: displayName,
          email: email,
        };
        this.setToken(usr);
        console.log('ok');
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  newUser(displayName, email, uid) {}

  signup(email, password) {
    return this.http
      .post<User>(this.rootUrl + 'user/signIn', { email, password })
      .pipe(
        map((user) => {
          user = new User(user);
          return user;
        })
      );
  }

  logout() {
    this.auth.signOut();
    sessionStorage.removeItem('currentUser');
    this.currentUser = null;
  }

  setToken(user: User) {
    if (user) {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUser = user;
    }
  }
}
