import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { IItem } from '../interfaces/item.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public items: Array<IItem>
  public totalPrice:number = 0;
  public totalQuantity:number = 0;
  constructor(private _cartService:CartService) { }

  ngOnInit() {
    this._cartService.currentDataCart$.subscribe(x=>{
      if(x)
      {
        this.items = x;
        this.totalQuantity = x.length;
        this.totalPrice = x.reduce((sum, current) => sum + (current.price * current.quantity), 0);
      }
    })
  }

  public remove(producto:IItem)
  {
    this._cartService.removeElementCart(producto);
  }
  

}
