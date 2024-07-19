import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], term:string ): Product[] {
    return products.filter((product)=>product.title.toLocaleLowerCase().includes(term.toLocaleLowerCase()));
  }

}
