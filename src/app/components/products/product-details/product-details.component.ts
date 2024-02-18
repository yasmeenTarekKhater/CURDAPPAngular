import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductStaticService } from 'src/app/services/product-static.service';
import { ProductsdynamicService } from 'src/app/services/productsdynamic.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId: any;
  product: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    public productServices: ProductsdynamicService,
    public router: Router
  ) {}
  
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.product = this.productServices.getProductById(this.productId).subscribe({
      next:(data)=>{
        this.product=data
      }
    })
  }

  backToProduct() {
    this.router.navigate(['/']);
  }
}
