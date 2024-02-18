import { Component, OnInit } from '@angular/core';
import { ProductStaticService } from 'src/app/services/product-static.service';
import { ProductsdynamicService } from 'src/app/services/productsdynamic.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any;
  constructor(public _productServices: ProductsdynamicService) {}

  ngOnInit(): void {
    this._productServices.getAllProducts().subscribe({
      next:(data)=>{
        this.products=data;
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
  deleteProductHandler(id: any,name:string) {
    this._productServices.deleteProduct(id).subscribe({
      next:(data)=>{
        this.products=this.products.filter(
          (product:any)=>product.id != id
        );
      }
    })
    alert(`Are you sure , you want to delete this product: ${name} ?`)
  }
}
