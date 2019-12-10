import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IItem } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = new BehaviorSubject<Array<IItem>>(null);
  public currentDataCart$ = this.cart.asObservable();

  constructor() { }

  public changeCart(newData: IItem) {
    //Obtenemos el valor actual
    let listCart = this.cart.getValue();
    //Si no es el primer item del carrito
    if(listCart)
    {
      //Buscamos si ya cargamos ese item en el carrito
      let objIndex = listCart.findIndex((obj => obj.id == newData.id));
      //Si ya cargamos uno aumentamos su cantidad
      if(objIndex != -1)
      {
        listCart[objIndex].quantity += 1;
      }
      //Si es el primer item de ese tipo lo agregamos derecho al carrito
      else {
        listCart.push(newData);
      }  
    }
    //Si es el primer elemento lo inicializamos
    else {
      listCart = [];
      listCart.push(newData);
    }

    this.cart.next(listCart);
  }

  public removeElementCart(newData:IItem){
    //Obtenemos el valor actual de carrito
    let listCart = this.cart.getValue();
    //Buscamos el item del carrito para eliminar
    let objIndex = listCart.findIndex((obj => obj.id == newData.id));
    if(objIndex != -1)
    {
      //Seteamos la cantidad en 1 (ya que los array se modifican los valores por referencia, si vovlemos a agregarlo la cantidad no se reiniciará)
      listCart[objIndex].quantity = 1;
      //Eliminamos el item del array del carrito
      listCart.splice(objIndex,1);
    }

    this.cart.next(listCart);

  }

}
