import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IShoppingCartItem} from '../interfaces/grocery-list.interface';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {


  private entryDetail = new BehaviorSubject<IShoppingCartItem>(null);

  currentEntry = this.entryDetail.asObservable();

  updateEntry(cartEntry: IShoppingCartItem) {
    this.entryDetail.next(cartEntry);
  }
}
