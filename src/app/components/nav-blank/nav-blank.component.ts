
import { Component, OnInit, ɵLocaleDataIndex } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';


@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit{
constructor(private _Router:Router,private _WishlistService:WishlistService,private _CartService:CartService){}


cartCount:Number =0;
wishCount :Number=0;


singOut():void{
  localStorage.removeItem('_token');
  this._Router.navigate(['/login']);
}
count:Number=0;
ngOnInit(): void {

this._WishlistService.wishCount.subscribe({
  next:(data)=>{
    this.count=data;

  }
})
this._CartService.cartNumber.subscribe(
  {next:(data)=>{
   this.cartCount=data;
  }

  }
 );
 this._CartService.getCart().subscribe({
  next:(res)=>{
   this._CartService.cartNumber.next(res.numOfCartItems);
  }
 })
 this._WishlistService.gitAWhish().subscribe({
  next:(res)=>
    {
    this._WishlistService.wishCount.next(res.count);
    }
 })
}

}
