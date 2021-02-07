import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/User';
import { map, take, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  rootUrl = 'https://europe-west1-tfe-wishlist.cloudfunctions.net/api/';

  // users
  getUsers() {
    return this.http
      .get<User[]>(this.rootUrl + 'users')
      .pipe(map((res) => res.map((u) => new User(u))));
  }

  getOneUser(id: string) {
    this.http
      .get<User>(this.rootUrl + `user/${id}`)
      .pipe(
        take(1),
        map((u) => new User(u))
      )
      .toPromise();
  }

  deleteUser(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.rootUrl}user/${id}`).pipe(
      map((res) => true),
      catchError((err) => {
        console.error(err);
        return of(false);
      })
    );
  }
}
