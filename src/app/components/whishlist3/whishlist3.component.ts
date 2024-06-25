import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-whishlist3',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './whishlist3.component.html',
  styleUrls: ['./whishlist3.component.css']
})
export class Whishlist3Component implements OnInit {
constructor(private _WishlistService:WishlistService
  ,private _CartService:CartService
  ,private _ToastrService:ToastrService){}


products:Product[]=[];
ngOnInit(): void {
  this._WishlistService.gitAWhish().subscribe({
    next:(res)=>{
        this.products=res.data;
        console.log(res)
    }
  })
}
removeFav(idProduct:string):void{
this._WishlistService.removeItem(idProduct).subscribe({
  next:(res)=>{
    this.products=res.data
  }
})
}
addCart(productId:string):void{
  this._CartService.addToCart(productId).subscribe({
    next:(res)=>{
     this._ToastrService.success(res.message);
    }
    ,
    error:(error)=>{
      console.log(error);
      this._ToastrService.warning(error.message);
    }
  });

}
}
