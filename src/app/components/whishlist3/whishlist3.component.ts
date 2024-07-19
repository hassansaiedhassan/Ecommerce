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
  imports: [CommonModule, RouterLink],
  templateUrl: './whishlist3.component.html',
  styleUrls: ['./whishlist3.component.css']
})
export class Whishlist3Component implements OnInit {
  constructor(
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  wishFav: string[] = [];
  products: Product[] = [];

  ngOnInit(): void {
    this._WishlistService.gitAWhish().subscribe({
      next: (res) => {
        this.products = res.data;
        this.wishFav = res.data.map((product: Product) => product.id);
      },
      error: (err) => {
        this._ToastrService.error('Failed to load wishlist');
        console.log(err);
      }
    });
  }

  removeFav(idProduct: string): void {
    this._WishlistService.removeItem(idProduct).subscribe({
      next: (res) => {
        this.products = this.products.filter(product => product.id !== idProduct);
        this.wishFav = this.wishFav.filter(id => id !== idProduct);
        this._ToastrService.success('Item removed from wishlist');
      },
      error: (err) => {
        this._ToastrService.error('Failed to remove item from wishlist');
        console.log(err);
      }
    });
  }

  inWishList(id: string): boolean {
    return this.wishFav.includes(id);
  }

  addCart(productId: string): void {
    this._CartService.addToCart(productId).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
      },
      error: (error) => {
        console.log(error);
        this._ToastrService.warning(error.message);
      }
    });
  }
}
