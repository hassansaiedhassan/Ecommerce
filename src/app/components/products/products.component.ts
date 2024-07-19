import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { EcomdataService } from 'src/app/services/ecomdata.service';
import { WishlistService } from 'src/app/services/wishlist.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  constructor(private _EcomdataService:EcomdataService ,private _CartService:CartService,private _ToastrService:ToastrService,private _WishlistService:WishlistService,
    private spinner: NgxSpinnerService
  ){}

  products:Product[]=[];
  searchTerm:string='';
  counter:number=0;

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
  addFav(productId:string|undefined):void{
    this._WishlistService.addToWhish(productId).subscribe({
      next:(res)=>{
        console.log(res)
        this._ToastrService.success(res.message)
        this.counter=res.count

      },
      error:(err)=>{
        console.log(err);
      }
    })
    }
    removeFav(idProduct:string):void{
      this._WishlistService.removeItem(idProduct).subscribe({
       next:(res)=>{
        console.log(res)
        this.counter=res.count;
        this._ToastrService.success(res.message)

       }
       ,
       error:(err)=>{
        this._ToastrService.success(err.message)
       }
      })}

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
        },500)
      }
    });

  }
}
