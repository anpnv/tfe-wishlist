import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/User';
import { map, take, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { List } from '../classes/list';
import { Product } from '../classes/product';

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

  getUserByemail(email: string) {
    return this.http
      .get<User>(this.rootUrl + `user/getByEmail/${email}`)
      .pipe(
        take(1),
        map((u) => new User(u))
      )
      .toPromise();
  }

  async signUp(email, password, displayName) {
    return await this.http
      .post<User>(this.rootUrl + 'user/signUp', {
        email,
        password,
        displayName,
      })
      .pipe(
        map((user) => {
          let usr;
          usr = new User(user);
          return usr;
        })
      )
      .toPromise();
  }

  async signUpWithProvider(email, displayName, uid) {
    return await this.http
      .post<User>(this.rootUrl + 'user/signUpProvider', {
        email,
        displayName,
        uid,
      }).subscribe(user => user);
  }

  deleteUser(id): Observable<boolean> {
    return this.http.delete<boolean>(`${this.rootUrl}user/${id}`).pipe(
      map((res) => true),
      catchError((err) => {
        console.error(err);
        return of(false);
      })
    );
  }

  createList(list): Observable<List> {
    const { date, authorId, name } = list;
    return this.http
      .post<List>(this.rootUrl + 'list', {
        date,
        authorId,
        name,
      })
      .pipe(
        take(1),
        map((l) => new List(l))
      );
  }

  async getListById(id) {
    return this.http.get<List>(this.rootUrl + `list/${id}`).pipe(
      take(1),
      map((l) => new List(l))
    );
  }

  async getProductById(id) {
    return this.http.get<Product>(this.rootUrl + `product/${id}`).pipe(
      take(1),
      map((p) => new Product(p))
    );
  }

  addProduct(listId, productId) {
    return this.http
      .put<Boolean>(this.rootUrl + 'list/addProduct/' + listId, { productId })
      .pipe(
        map((res) => true),
        catchError((err) => {
          console.log(err);
          return of(false);
        })
      );
  }

  removeProduct(listId, productId) {
    return this.http
      .put<Boolean>(this.rootUrl + 'list/removeProduct/' + listId, { productId })
      .pipe(
        map((res) => true),
        catchError((err) => {
          console.log(err);
          return of(false);
        })
      );
  }
}
