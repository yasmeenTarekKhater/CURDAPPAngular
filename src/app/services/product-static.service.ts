import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { productList } from './productList';

@Injectable({
  providedIn: 'root',
})
export class ProductStaticService {
  products: IProduct[] = [];
  constructor() {
    this.products = productList;
  }

  getAllProduct(): IProduct[] {
    return this.products;
  }

  getProductId(id: any) {
    return this.products.find((product) => product.id == id);
  }

  deleteProduct(id: any) {
    this.products = this.products.filter((product) => product.id != id);
    return this.products;
  }
  addProduct(newProduct:any){
    newProduct.id=this.products[this.products.length-1].id+1;
    this.products.push(newProduct);
    return this.products;
  }
  updateProduct(id:any,updatedProduct:any){
    let foundedProductIndex=this.products.findIndex((product) => product.id == id);
    this.products[foundedProductIndex]={...updatedProduct};
    return this.products;
  }
}
