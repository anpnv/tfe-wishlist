import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { flatMap, map, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  rootURL = ' https://europe-west1-tfe-wishlist.cloudfunctions.net/api/';

  signIn(user) {
    console.log('test')
    return this.http
      .post(this.rootURL + 'user/signIn', user);
  }
}
