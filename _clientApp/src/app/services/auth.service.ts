import { Injectable } from '@angular/core';
import { User } from '../classes/User';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, NavController } from '@ionic/angular';
import { DatabaseService } from './database.service';
import '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';

import {
  cfaSignIn,
  cfaSignInGoogle,
  cfaSignOut,
  SignInResult,
} from 'capacitor-firebase-auth';

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
      message: 'Connexion en cours...',
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
      }).catch(err => {
        console.log(err);
        loading.dismiss();
      });
  }

  async signup(email, password, displayName) {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Création de compte en cours...',
    });
    loading.present();
    this.db
      .signUp(email, password, displayName)
      .then((usr) => {
        if (usr) this.setToken(email);
      })
      .then(() => {
        loading.dismiss().then(() => {
          this.redirectHome();
        });
      });
  }

  logout() {
    cfaSignOut().subscribe();
    this.auth.signOut().then(() => {
      this.navCtrl.navigateRoot('/auth');
    });
    sessionStorage.removeItem('currentUser');
    this.currentUser = null;
  }

  async setToken(email: string) {
    if (email) {
      await this.db.getUserByemail(email).then((usr) => {
        sessionStorage.setItem('currentUser', JSON.stringify(usr));
        this.currentUser = usr;
      });
    }
  }

  async googleLogin() {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Connexion en cours...',
    });
    loading.present();
    cfaSignIn('google.com').subscribe(async (res) => {
      const { email, displayName, uid } = res;
       this.db
        .signUpWithProvider(email, displayName, uid)
        .then(async () => {
          await this.setToken(email);
        })
        .then(() => {
          loading.dismiss().then(() => {
            this.redirectHome();
          });
        });
    });
  }

  async facebookLogin() {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Connexion en cours...',
    });
    loading.present();
    cfaSignIn('facebook.com').subscribe(async  (res) => {
      const { email, displayName, uid } =  res;
      await this.db
        .signUpWithProvider(email, displayName, uid)
        .then(async () => {
          await this.setToken(email);
        })
        .then(() => {
          loading.dismiss().then(() => {
            this.redirectHome();
          });
        });
    });
  }
}
