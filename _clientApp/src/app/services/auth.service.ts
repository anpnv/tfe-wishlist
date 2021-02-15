import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, flatMap, switchMap, take } from 'rxjs/operators';
import { User } from '../classes/User';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User;
  rootUrl = 'https://europe-west1-tfe-wishlist.cloudfunctions.net/api/';

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth,
    private navCtrl: NavController,
    private db: DatabaseService
  ) {
    const data = JSON.parse(sessionStorage.getItem('currentUser'));
    this.currentUser = data ? new User(data) : null;
    this.handleRedirect();
  }

  private async handleRedirect() {
    if (this.currentUser) {
      console.log('çapeu direct');
      await this.navCtrl.navigateForward('/tabs/home');
    }
  }

  async uid() {
    return this.auth.authState.subscribe((res) => {
      if (res) {
        return res.uid;
      }
    });
  }

  login(email, password) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        const { displayName, email, uid } = user.user;
        this.setToken(email);
      })
      .finally(() => this.handleRedirect());
  }

  
  signup(email, password) {
   this.db.signUp(email, password)
  }

  logout() {
    this.auth.signOut().then(() => {
      this.navCtrl.navigateRoot('/auth');
    });
    sessionStorage.removeItem('currentUser');
    this.currentUser = null;
  }

  async setToken(email: string) {
    if (email) {
      await this.db.getUserByemail(email).then(async (usr) => {
        sessionStorage.setItem('currentUser', JSON.stringify(usr));
        this.currentUser = usr;
      });
    }
  }
}
