import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import {DataSourceService} from '../services/data-source.service';
import {IGroceryItem, IShoppingCartItem} from '../interfaces/grocery-list.interface';


@Component({
  selector: 'app-cart-add',
  templateUrl: './cart-add.component.html',
  styleUrls: ['./cart-add.component.scss']
})
export class CartAddComponent implements OnInit {
  public itemSelected: number;
  public qty = new FormControl('', Validators.required);

  items: IGroceryItem[] = [
    {id: '1', name: 'Bread', value: 3.60 },
    {id: '2', name: 'Milk', value: 2.40 },
    {id: '3', name: 'Eggs', value: 4.00 },
    {id: '4', name: 'Butter', value: 5.20 },
  ];


  constructor (private dataSource: DataSourceService) {}

  ngOnInit() {
  }

  onAdd() {
    const itemIndex = this.items.findIndex(item => item.value === this.itemSelected);

    const qty_price: number = this.items[itemIndex].value * this.qty.value;

    const shoppingEntry: IShoppingCartItem = {
      id: this.items[itemIndex].id,
      name: this.items[itemIndex].name,
      qty: this.qty.value,
      price: qty_price.toFixed(2),
    };

    console.log(shoppingEntry);

    if (isNaN(shoppingEntry.qty)) {
      shoppingEntry.qty = 0;
      shoppingEntry.price = 0;
    }

    if (shoppingEntry.qty > 0) {
      this.dataSource.updateEntry(shoppingEntry);

    }

  }

  onCancel() {
    // console.log('Reset Value');
    this.itemSelected = null;
    this.qty.reset();
  }
}
