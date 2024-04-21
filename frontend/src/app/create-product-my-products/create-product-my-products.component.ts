import { Component } from '@angular/core';
import { MyProductsComponent } from '../my-products/my-products.component';

@Component({
  selector: 'create-product-my-products',
  templateUrl: './create-product-my-products.component.html',
  styleUrl: './create-product-my-products.component.css'
})
export class CreateProductMyProductsComponent {
  constructor(public myProducts: MyProductsComponent) {

  }

}
