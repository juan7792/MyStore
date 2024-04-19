import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';

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
    let accountId: any = this.service.getInputId();

    this.service.getMyData(this.path, accountId)
      .subscribe(response => {
        this.products = response;
      },
      error => {
        throw error;
      });
  }

  createProduct(name: HTMLInputElement
    , desc: HTMLInputElement
    , price: HTMLInputElement
    , currency: HTMLSelectElement) {
  
      let newProduct: any = { name: name.value
        , description: desc.value
        , price: price.value
        , currency: currency.value
      };
      name.value = '';
      desc.value = '';
      price.value = '';
      
    let accountId: any = this.service.getInputId();

    this.service.createData(newProduct, this.path, accountId)
    .subscribe(response => {
        let updatedProduct =  response;
        this.products.splice(0, 0, updatedProduct);
      },
      (error: Response) => {
        if (error instanceof BadInput) {
          alert("Please enter valid data.");
        }
        else throw error;
      });
  }

  deleteProduct(product: any) {
    let index = this.products.indexOf(product);
    this.service.deleteData(product, this.path)
      .subscribe(response => {
        this.products.splice(index, 1);
      },
      (error: Response) => {
        if (error instanceof NotFoundError) {
          alert('This product has already been deleted.');
        }
        else throw error;
      })
  }
}
