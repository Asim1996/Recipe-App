import {Action} from '@ngrx/store';
// Bundle everything in a single object 
import * as ShoppingListActions from './shopping-list.actions';
import {Ingredient} from '../../shared/ingredient.model';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

const initialState ={
	ingredients:[
	new Ingredient('Apples',5),
	new Ingredient('Tomatoes',10)
	]
} 
export function shoppingListReducer(state=initialState, action:ShoppingListActions.ShoppingListActions){
	switch(action.type) {
		case ShoppingListActions.ADD_INGREDIENT:
		return {
			...state,
			ingredients:[...state.ingredients,action.payload]
		}
		// spread operator to get all properties and update ingredients property
		default:
			return state;

	}
}