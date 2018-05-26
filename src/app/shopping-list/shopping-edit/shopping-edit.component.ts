import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';

import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service'; 
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';
import * as fromApp from '../../store/app.reducers'; 

// ShoppingListAction is the variable where everything from that file is stored
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
// @Viewchild can be used too
@ViewChild('f') slForm:NgForm;
subscription:Subscription;
editMode=false;
// editedItemIndex:number;
editedItem: Ingredient;
  constructor(private shoppingListService:ShoppingListService,private store:Store<fromApp.AppState> ) { }

  ngOnInit() {
   this.subscription=this.store.select('shoppingList')
   .subscribe(
     data => {
       if(data.editedIngredientIndex>-1){
         this.editedItem=data.editedIngredient;
         this.editMode=true;
         this.slForm.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
        })
       }else {
         this.editMode=false;
       }
     }) 
 // Without STORE
  // this.subscription=this.shoppingListService.startedEditing
  // .subscribe((index:number) => {
  //   // this.editedItemIndex=index;
  //   this.editMode=true;
  //   this.editedItem=this.shoppingListService.getIngredient(index);
  //   this.slForm.setValue({
  //     name:this.editedItem.name,
  //     amount:this.editedItem.amount
  //   })
  // })
  }
  addIng(form:NgForm){
  	// event.preventDefault();
    const value=form.value;
  	 const newIngredient =new Ingredient(value.name,value.amount); 
     if(this.editMode){
       this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient:newIngredient}));
    
       // this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient)

     }else{
            // this.shoppingListService.addIngredient(newIngredient);
            this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
        }
      this.editMode=false;
       form.reset();
  }
  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }
  onDelete(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy(){
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }
}
