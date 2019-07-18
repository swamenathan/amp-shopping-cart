import { Component, OnInit } from '@angular/core';
import {DataSourceService} from '../services/data-source.service';
import {IShoppingCartItem} from '../interfaces/grocery-list.interface';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  public cartEntries: IShoppingCartItem[] = new Array();
  public total_cost: number;
  public tableDataSource: any;

  displayedColumns: string[] = ['name', 'qty', 'price', 'delete'];

  constructor(private dataSource: DataSourceService) { }

  ngOnInit() {

    this.total_cost = 0;
    this.dataSource.currentEntry.subscribe(res => {
      console.log('res = ', res);

      if (res !== null) {
        this.cartEntries.push(res);

        this.tableDataSource = new MatTableDataSource(this.cartEntries);
        this.total_cost = this.total_cost + parseFloat(res.price);
      }
    });


  }

  onClear(id: any) {
    // console.log('id = ', id);
    const index = this.cartEntries.findIndex(item => item === id);
    if (index > -1) {
      this.cartEntries.splice(index, 1);
      this.total_cost = this.total_cost - parseFloat(id.price);
    }
    this.tableDataSource = new MatTableDataSource(this.cartEntries);

  }

  getTotalCost() {
    return Math.abs(Number(this.total_cost.toFixed(2)));
  }

}
