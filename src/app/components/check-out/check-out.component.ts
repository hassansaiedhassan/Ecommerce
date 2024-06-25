import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
constructor(private _FormBuilder:FormBuilder,private _ActivatedRoute:ActivatedRoute,private _CartService:CartService){}
CheckOut:FormGroup=this._FormBuilder.group({
  details:["",Validators.required],
  phone:["",Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)],
  city:["",Validators.required],
});
shippingAddress:any={}as object;
handleForm(CheckOut:FormGroup):void{


  this._CartService.checkOut(this.cartId, CheckOut.value).subscribe({
    next:(res)=>{
     if(res.status=="success"){
        this.navigateToPage(res.session.url);
     }
    },
    error:(err)=> {
      console.log(err)
    },
  })
}
navigateToPage(url:string)
{
  window.location.href=url;
}
cartId:any='';
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(res)=>{
      this.cartId =res.get('id');
    }
    ,error:(err)=>{
      console.log(err);
    }
  })
}
}
