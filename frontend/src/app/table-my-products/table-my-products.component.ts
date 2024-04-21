import { Component } from '@angular/core';
import { MyProductsComponent } from '../my-products/my-products.component';

@Component({
  selector: 'table-my-products',
  templateUrl: './table-my-products.component.html',
  styleUrl: './table-my-products.component.css'
})
export class TableMyProductsComponent {
  constructor(public myProducts: MyProductsComponent){

  }
}
