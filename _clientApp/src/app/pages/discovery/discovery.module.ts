import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscoveryPageRoutingModule } from './discovery-routing.module';

import { DiscoveryPage } from './discovery.page';
import { ProductLineComponent } from 'src/app/components/product-line/product-line.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscoveryPageRoutingModule
  ],
  declarations: [DiscoveryPage, ProductLineComponent]
})
export class DiscoveryPageModule {}
