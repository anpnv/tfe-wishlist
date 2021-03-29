import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { List } from 'src/app/classes/list';
import { User } from 'src/app/classes/User';
import { CreateListComponent } from 'src/app/components/create-list/create-list.component';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  privateList: any;

  constructor(
    private db: DatabaseService,
    private auth: AuthService,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {
    this.auth.updateCurrentUser();
    const uid = (this.auth.currentUser.uid);
    this.db.getOneUser(uid);
    
  }

  ionViewWillEnter() {
    this.updateList();
  }

  async initPrivateList() {
    await this.updateList();
  }

  async updateList() {
    const list = this.auth.currentUser.privateList;
    this.privateList = await this.db.getListById(
      list
    );
  }

  add() {
    const id = this.auth.currentUser.privateList;
    this.db.addProduct(id, '3Mq3XZsT5MHzI0yI9fEk').subscribe(() => {
      this.updateList();
    });
  }

  async addPublicList() {
    const modal = await this.modalCtrl.create({
      component: CreateListComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      
    });
    return await modal.present();
  }

  async delete(id) {
    await this.updateList();
  }
}
