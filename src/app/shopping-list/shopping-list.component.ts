import { Component, OnInit, OnDestroy } from '@angular/core';
import {Store} from '@ngrx/store';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Observable} from 'rxjs/observable';
import * as fromShoppingList from './store/shopping-list.reducers';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers'; 
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  
})
export class ShoppingListComponent implements OnInit {
	shoppingListState:Observable<{ingredients:Ingredient[]}>;
  constructor(private shoppingListService:ShoppingListService,private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    //Getting the value from store it is an observable 
    this.shoppingListState=this.store.select('shoppingList');

  }
  onEditItem(index:number){
    // this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }
 
}
