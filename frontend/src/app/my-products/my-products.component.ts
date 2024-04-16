import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'my-products',
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.css'
})
export class MyProductsComponent implements OnInit {
  products: any[] = [];
  private path = '/myproducts';

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

  deleteProduct(product: any) {
    let index = this.products.indexOf(product);
    this.service.deleteData(product, this.path)
      .subscribe(response => {
        this.products.splice(index, 1);
        console.log(response);
        console.log(index);
      })
  }
}
