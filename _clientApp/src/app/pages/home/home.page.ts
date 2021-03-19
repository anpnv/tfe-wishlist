import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from 'src/app/classes/list';
import { User } from 'src/app/classes/User';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  privateList: any;

  constructor(private db: DatabaseService, private auth: AuthService) {}

  ngOnInit() {
   this.initPrivateList()
  }

  async initPrivateList() {
    this.privateList = await this.db.getListById(this.auth.currentUser.privateList);
  }
}
