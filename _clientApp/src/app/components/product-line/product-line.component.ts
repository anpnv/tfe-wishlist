import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/classes/product';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-product-line',
  templateUrl: './product-line.component.html',
  styleUrls: ['./product-line.component.scss'],
})
export class ProductLineComponent implements OnInit {

  @Input() id: string;
  product: any;

  
  constructor(private db: DatabaseService) { }

  async ngOnInit() {
    this.product = await  this.db.getProductById(this.id);
  }

  open(){
    console.log(this.id);
  }

}
