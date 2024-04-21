import { Component } from '@angular/core';
import { TransactionsComponent } from '../transactions/transactions.component';

@Component({
  selector: 'table-transactions',
  templateUrl: './table-transactions.component.html',
  styleUrl: './table-transactions.component.css'
})
export class TableTransactionsComponent {
  constructor(public transactions: TransactionsComponent){

  }
}
