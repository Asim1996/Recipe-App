import {Action} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';
export const ADD_INGREDIENT ='ADD_INGREDIENT';

export class AddIngredients implements Action {
	readonly type= ADD_INGREDIENT;
	// payload:Ingredient;
	constructor(public payload:Ingredient){}
}


// Bundle all actions and exporting it in a single type
export type ShoppingListActions=AddIngredients;