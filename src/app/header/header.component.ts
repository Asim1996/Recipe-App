import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	@Output() special= new EventEmitter<string>()
  constructor() { }

  ngOnInit() {
  }
  routeRecipe(){
  	this.special.emit('recipe');
  }
  routeShopping(){
  		this.special.emit('shoppingList');
  }
}
