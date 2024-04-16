import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  account: any[] = [];
  private path = '/account';

  constructor(private service: DataService) {
  }
  
  createAccount(email: HTMLInputElement
    , password: HTMLInputElement) {

    let account: any = { username: email.value
      , password: password.value
    };
    email.value = '';
    password.value = '';
    
    this.service.createData(account, this.path)
    .subscribe(response => {
        console.log(response);
      });
  }
}
