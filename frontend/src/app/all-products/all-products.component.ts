import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { BadInput } from '../common/bad-input';

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
      .subscribe(
      response => {
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
        let updatedProduct = response;
        this.products.splice(0, 0, updatedProduct);
      },
      (error: Response) => {
        if (error instanceof BadInput) {
          alert("Please enter valid data");
        }
        else throw error;
      });
  }

  sellProduct(product: any) {
    this.service.updateData(product, this.path)
      .subscribe(response => {
      },
      error => {
        throw error;
      });
  }
}
