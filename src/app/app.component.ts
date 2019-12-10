import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shopping-cart';

  public openCart:boolean = false;
  public cantProducts:number = 0;

  public cart(){
    this.openCart = !this.openCart;
  }

}

