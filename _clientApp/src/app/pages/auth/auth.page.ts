import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/classes/User';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  constructor(private auth: AngularFireAuth, public db: DatabaseService) {}

  ngOnInit() {}

  deleteUser(id){
    this.db.deleteUser(id).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )
  }
}
