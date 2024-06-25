import { Component, OnInit } from '@angular/core';
import { EcomdataService } from 'src/app/services/ecomdata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
constructor(private _EcomdataService:EcomdataService){}
brands:any[]=[]
ngOnInit(): void {
  this._EcomdataService.getBrands().subscribe({
    next:(res)=>{
      console.log(res)
      this.brands=res.data
    }
  })
}
}
