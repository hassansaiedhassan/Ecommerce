import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
constructor(private _CartService:CartService,private _ToastrService:ToastrService){
}
cartDetails:any={};
removeItem(productId:string):void{

  this._CartService.removeItem(productId).subscribe({
    next:(res)=>{
      this.cartDetails=res.data;
      this._ToastrService.success('success');
    },
    error:(err)=>{
      console.log(err)
    }
  })

};
changeCount(id:string,count:number):void{

if(count>0){
  this._CartService.updateCartProduct(id,count).subscribe({
    next:(response)=>{
      this.cartDetails=response.data;
      this._ToastrService.success('success');
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
else{
  this.removeItem(id);
}
}

ngOnInit(): void {
  this._CartService.getCart().subscribe({
next:(res)=>{
  this.cartDetails=res.data
  console.log(res)
},
error:(error)=>{
  console.log(error)
}
})

};



}
