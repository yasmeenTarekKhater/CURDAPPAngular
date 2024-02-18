import { Component } from '@angular/core';
import { ProductsdynamicService } from 'src/app/services/productsdynamic.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
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
}
