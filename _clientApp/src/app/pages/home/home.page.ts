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
    this.initPrivateList();
  }


  
  ionViewWillEnter(){
    this.updateList();
  }



  async initPrivateList() {
    await this.updateList();
  }



  async updateList(){
    this.privateList = await this.db.getListById(this.auth.currentUser.privateList);
  }

  add(){
    const id = this.auth.currentUser.privateList;
    this.db.addProduct(id, "IW9bWGftXfKiOB5At43E").subscribe(() => {
      this.updateList();
    });
  }


  async delete(id){
    await this.updateList();
  }
}
