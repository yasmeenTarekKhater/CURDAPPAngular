import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsdynamicService {
  baseUrl:string='http://localhost:3005/products';

  constructor(public http:HttpClient) { }

  getAllProducts(){
    return this.http.get(this.baseUrl);
  }
  getProductById(id:any){
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  addProduct(newProduct:any){
    return this.http.post(this.baseUrl,newProduct);
  }
  deleteProduct(id:any){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  updateProduct(id:any,updatedProduct:any){
    return this.http.put(`${this.baseUrl}/${id}`,updatedProduct);
  }
}
