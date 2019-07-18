export interface IGroceryList {
  id: string;
  name: string;
  qty: number;
  price: number;
}


export interface IShoppingCartItem {
  id: string;
  name: string;
  qty: any;
  price: any;
}


export interface IGroceryItem {
  id: string;
  name: string;
  value: number;
}
