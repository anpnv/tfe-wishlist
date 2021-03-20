import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.page.html',
  styleUrls: ['./discovery.page.scss'],
})
export class DiscoveryPage implements OnInit {

  isOpen: boolean;
  products = [];


  constructor(private db: DatabaseService) { 
    this.isOpen = true;
  }

  ngOnInit() {
    this.db.getProducts().subscribe(elem => {
      elem.forEach(prod => (
        this.products.push(prod)
      ))
    });
    console.log(this.products);
  }

  show(){
    this.isOpen = !this.isOpen;
  }

  add(){
    // todo 
    // afficher TOAST : que c'est rajouté 

    // afficher un petit v au produits déjà dans la liste
    // eventuellement supprimer de la liste
    
  }

}
