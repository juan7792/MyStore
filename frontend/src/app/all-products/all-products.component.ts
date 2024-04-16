import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  private path = '/allproducts';

  constructor(private service: DataService) {
  }
  
  ngOnInit(): void {
    this.service.getData(this.path)
      .subscribe(response => {
        this.products = response;
        console.log(response);
      });
  }

  createProduct(name: HTMLInputElement
    , desc: HTMLInputElement
    , price: HTMLInputElement
    , currency: HTMLSelectElement) {

    let product: any = { name: name.value
      , description: desc.value
      , price: price.value
      , currency: currency.value
    };
    name.value = '';
    desc.value = '';
    price.value = '';
    
    this.service.createData(product, this.path)
    .subscribe(response => {
        product['id'] = (response as any).id;
        this.products.splice(0, 0, product);
        console.log(response);
      });
  }

  sellProduct(product: any) {
    console.log(product.productId);

    this.service.updateData(product, this.path)
      .subscribe(response => {
        console.log(response);
      });
  }
}
