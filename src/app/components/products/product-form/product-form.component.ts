import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/models/iproduct';
import { ProductStaticService } from 'src/app/services/product-static.service';
import { ProductsdynamicService } from 'src/app/services/productsdynamic.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit,OnDestroy {
  myFormSubmition:any;
  productId: any;
  updatedProduct: any;
  flag: boolean = false;

  constructor(
    public _productServices: ProductsdynamicService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {}
  

  ngOnInit(): void {
    this.myFormSubmition=this.activatedRoute.params.subscribe({
      next: (params) => {
        this.productId = params['id'];
        this.getName.setValue('');
        this.getPrice.setValue(null);
        this.getQuantity.setValue(null);
        this.getproductimage.setValue(null);
      },
    });
    if (this.productId != 0) {
      this.myFormSubmition=this._productServices
        .getProductById(this.productId)
        .subscribe({
          next: (data) => {
            this.updatedProduct = data;
            this.getName.setValue(this.updatedProduct.name);
            this.getPrice.setValue(this.updatedProduct.price);
            this.getQuantity.setValue(this.updatedProduct.quantity);
            this.getproductimage.setValue(this.updatedProduct.src);
          },
        });
    }
  }
  ngOnDestroy(): void {
    this.myFormSubmition.unsubscribe();
  }
  productsForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    price: new FormControl(null, [Validators.required, Validators.min(10)]),
    quantity: new FormControl(null, [Validators.required, Validators.min(1)]),
    src: new FormControl(null,Validators.required)
  });

  get getName() {
    return this.productsForm.controls['name'];
  }
  get getPrice() {
    return this.productsForm.controls['price'];
  }
  get getQuantity() {
    return this.productsForm.controls['quantity'];
  }
  get getproductimage() {
    return this.productsForm.controls['src'];
  }

  formSubmition(e: any) {
    e.preventDefault();
    console.log(this.productsForm)
    if (this.productsForm.status == 'VALID') {
      //add operation add & update product
      if(this.productId == 0){
            //add
            this._productServices.addProduct(this.productsForm.value).subscribe({
              next:()=>{
                this.router.navigate(['/products']);
              }
            })
      }else{
        //update
        this._productServices
        .updateProduct(this.productId, this.productsForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['/products']);
          },
        });
      }
    } else {
      this.flag = true;
    }
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.displayImage(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  displayImage(imageUrl: any): void {
    this.getproductimage.setValue(imageUrl);
  }
}
