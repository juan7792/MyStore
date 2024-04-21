import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  private path = '/transactions';

  constructor(private service: DataService) {
  }
  
  ngOnInit(): void {
    let accountId: any = this.service.getInputId();

    this.service.getMyData(this.path, accountId)
      .subscribe(response => {
        this.transactions = response;
      },
      error => {
        throw error;
      });
  }
}
