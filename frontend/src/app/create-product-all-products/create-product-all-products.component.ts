import { Component } from '@angular/core';
import { AllProductsComponent } from '../all-products/all-products.component';

@Component({
  selector: 'create-product-all-products',
  templateUrl: './create-product-all-products.component.html',
  styleUrl: './create-product-all-products.component.css'
})
export class CreateProductAllProductsComponent {
  constructor(public allProducts: AllProductsComponent) {

  }

}
