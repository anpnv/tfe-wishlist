import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  users;

  constructor(private db: DbService) {}

  ngOnInit() {
    this.db.getUsers().subscribe((elem) => {
      this.users = elem;
      elem.forEach((res) => {
        console.log(res);
      });
    });
  }
}
