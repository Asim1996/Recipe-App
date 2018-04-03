import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
// @Viewchild can be used too
@Output() IngAdded=new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit() {
  }
  addIng(name:HTMLInputElement,amount:HTMLInputElement){
  	// event.preventDefault();
  	 var namount =parseInt(amount.value, 10);
  	  this.IngAdded.emit({
      name: name.value,
      amount: namount
    });
  }
}
