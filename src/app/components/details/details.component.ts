import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { EcomdataService } from 'src/app/services/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-details',
  templateUrl:'./details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
CartService(arg0: string) {
throw new Error('Method not implemented.');
}
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _EcomdataService: EcomdataService,
    private _CartService:CartService,
    private _ToastrService:ToastrService
  ) {}
productSliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,

    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false,
  };
productDetails:Product={}as Product ;
addCart(productId:string):void{
  this._CartService.addToCart(productId).subscribe({
    next:(_res)=>{
this._ToastrService.success(_res.message);
    }
    ,
    error:(error)=>{
      console.log(error);
    }
  });
}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        let idProduct:any = param.get('id');
        //api  ---idProduct
        this._EcomdataService.getProductDetails(idProduct).subscribe({
          next: (response) => {
         this.productDetails=response.data;
          }
        });
      }
    });


  }

}
