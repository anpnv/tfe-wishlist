import { Component } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { CreateListComponent } from '../components/create-list/create-list.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(private modalCtrl: ModalController, private routerOutlet: IonRouterOutlet,) { }



  async createList() {
    const modal = await this.modalCtrl.create({
      component: CreateListComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
          // nothing for now
      }
    });
    return await modal.present();
  }

  async createProduct() {
    console.log('clicekd"');
  }
}
