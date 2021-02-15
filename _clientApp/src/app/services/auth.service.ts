import { Injectable } from '@angular/core';
import { User } from '../classes/User';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, NavController } from '@ionic/angular';
import { DatabaseService } from './database.service';

import '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User;

  constructor(
    private auth: AngularFireAuth,
    private navCtrl: NavController,
    private db: DatabaseService,
    private loadingCtrl: LoadingController
  ) {
    const data = JSON.parse(sessionStorage.getItem('currentUser'));
    this.currentUser = data ? new User(data) : null;
    this.handleRedirect();
  }

  private async handleRedirect() {
    if (this.currentUser) {
      this.redirectHome();
    }
  }

  redirectHome() {
    return this.navCtrl.navigateForward('/tabs/home');
  }

  async uid() {
    return this.auth.authState.subscribe((res) => {
      if (res) {
        return res.uid;
      }
    });
  }

  async login(email, password) {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'loading...',
    });
    loading.present();
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        const { email } = user.user;
        this.setToken(email);
      })
      .then(() => {
        loading.dismiss().then(() => {
          this.redirectHome();
        });
      });
  }

  signup(email, password) {
    this.db.signUp(email, password);
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

  async googleLogin(){
    const googleUser = await Plugins.GoogleAuth.signIn();
    console.log('user:', googleUser);
   
  }
}
