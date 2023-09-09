import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from 'src/app/modules/product/model';

@Component({
  selector: 'app-cartitem',
  templateUrl: './cartitem.component.html',
  styles: [
  ]
})
export class CartitemComponent {
  img='https://firebasestorage.googleapis.com/v0/b/ecomm-store-22.appspot.com/o/assets%2Fimages%2F29.jpg?alt=media&token=aef10446-375d-493b-b2d5-5a8c64548346'
  @Input() item!:Product;
  constructor(private cartService:CartService){}

  removeFromCart(product:Product){
    this.cartService.remove(product);
    this.cartService.getTotal();
  }

  addQty(product:Product){
    this.cartService.addQty(product);
   this.cartService.getTotal();
  }
  lessQty(product:Product){
    this.cartService.lessQty(product);
    this.cartService.getTotal();
  }
}
