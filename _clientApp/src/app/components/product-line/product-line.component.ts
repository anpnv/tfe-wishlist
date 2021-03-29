import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/classes/product';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-product-line',
  templateUrl: './product-line.component.html',
  styleUrls: ['./product-line.component.scss'],
})
export class ProductLineComponent implements OnInit {

  @Input() id: string;
  @Input() listId: string;


  @Output() delete =  new EventEmitter<void>();
  @Output() add =  new EventEmitter<void>();

  product: any;



  
  constructor(private db: DatabaseService,
    private auth : AuthService) { }

  async ngOnInit() {
    this.product = await this.db.getProductById(this.id);
  }

  onDeleteClick(){
    this.db.removeProduct(this.listId, this.id).subscribe(() => {
      this.delete.emit();
    });
  }

  onOpenClick(){
    console.log("open here modal for update prod");
  }

  onAddClick(){
    console.log('clicked')
;    this.db.addProduct(this.auth.currentUser.privateList, this.id).subscribe(() => {
      this.add.emit();
    })
  }



}
