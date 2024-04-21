import { Component } from '@angular/core';
import { AllProductsComponent } from '../all-products/all-products.component';

@Component({
  selector: 'table-all-products',
  templateUrl: './table-all-products.component.html',
  styleUrl: './table-all-products.component.css'
})
export class TableAllProductsComponent {
  constructor(public allProducts: AllProductsComponent){

  }
}
