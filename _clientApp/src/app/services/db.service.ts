import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private http: HttpClient) {}

  rootURL = ' https://europe-west1-tfe-wishlist.cloudfunctions.net/api/';
 

  getUsers() {
    return this.http
      .get<[]>(this.rootURL + 'users')
      .pipe(map((res) => res.map((value) => value)));
  }
}
