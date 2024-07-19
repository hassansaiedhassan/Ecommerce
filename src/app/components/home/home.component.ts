import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { EcomdataService } from 'src/app/services/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
constructor(private _EcomdataService:EcomdataService,private _CartService:CartService,private _ToastrService:ToastrService
  ,private _WishlistService:WishlistService,
  private spinner: NgxSpinnerService
){
}

categories:any[]=[];
products:Product[]=[];
searchTerm:string='';
counter:number=0;

wishFav:string[]=[];
addCart(productId:string):void{
  this._CartService.addToCart(productId).subscribe({
    next:(res)=>{
     this._CartService.cartNumber.next(res.numOfCartItems);



  this._ToastrService.success(res.message);

        }
    ,
    error:(error)=>{

      this._ToastrService.warning(error.message);
    }
  });
}

addFav(productId:string|undefined):void{
this._WishlistService.addToWhish(productId).subscribe({
  next:(res)=>{
     this.wishFav=res.data
this._WishlistService.wishCount.next(res.data.length)
     this._ToastrService.success(res.message)

  },
  error:(err)=>{
    console.log(err);
  }
})
}

removeFav(idProduct:string):void{
  this._WishlistService.removeItem(idProduct).subscribe({
   next:(res)=>{
   this.wishFav=res.data;
   this._WishlistService.wishCount.next(res.data.length)
       this._ToastrService.success(res.message)

   }
  })};

  inWishList(id: string): boolean {
    return this._WishlistService.inWishList(id,this.wishFav);

  }

categoriesSliderOption: OwlOptions = {
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
mainSlider: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  autoplay:true,

items:1,
  nav: false,
};
ngOnInit(): void {
  setTimeout(()=>{
    this.spinner.show()
  },500)
  this._EcomdataService.getAllProducts().subscribe({
    next:(res)=>{
      this.products=res.data;
      console.log(res)
      setTimeout(()=>{
        this.spinner.hide()
      },1000)
    }
  });
  this._EcomdataService.getCategories().subscribe({
    next:(response)=>{
     this.categories=response.data
    }
    });

}
}
