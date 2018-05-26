import {Action} from '@ngrx/store';
// Bundle everything in a single object 
import * as ShoppingListActions from './shopping-list.actions';
import {Ingredient} from '../../shared/ingredient.model';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS='ADD_INGREDIENTS';
export const DELETE_INGREDIENT='DELETE_INGREDIENT';
export const UPDATE_INGREDIENT='UPDATE_INGREDIENT';
export const START_EDIT='START_EDIT';
export const STOP_EDIT='STOP_EDIT';



export interface State {
	ingredients:Ingredient[];
	editedIngredient:Ingredient;
	editedIngredientIndex:number
}
const initialState:State ={
	ingredients:[
	new Ingredient('Apples',5),
	new Ingredient('Tomatoes',10)
	],
	editedIngredient: null,
	editedIngredientIndex:-1
} 
export function shoppingListReducer(state=initialState, action:ShoppingListActions.ShoppingListActions){
	switch(action.type) {
		case ShoppingListActions.ADD_INGREDIENT:
		return {
			...state,
			ingredients:[...state.ingredients,action.payload]
		};
		// spread operator to get all properties and update ingredients property
		case ShoppingListActions.ADD_INGREDIENTS:
		return {
			...state,
			ingredients:[...state.ingredients,...action.payload]
		};
		case ShoppingListActions.DELETE_INGREDIENT:
		const oldIngredients = [...state.ingredients];
		oldIngredients.splice(state.editedIngredientIndex,1);
		console.log(oldIngredients);
		return {
			...state,
			ingredients:oldIngredients,
			editedIngredient:null,
			editedIngredientIndex:-1
		};
		case ShoppingListActions.UPDATE_INGREDIENT:
		// To get that updated ingredient
		const ingredient=state.ingredients[state.editedIngredientIndex];
		// Overwriting value of that ingredient
		const updateIngredient = {
			...ingredient,
			...action.payload.ingredient
		}
		const ingredients = [...state.ingredients];
		ingredients[state.editedIngredientIndex]=updateIngredient;
		return {
			...state,
			ingredients:ingredients,
			editedIngredient:null,
			editedIngredientIndex:-1
		};
		case ShoppingListActions.START_EDIT:
		const editedIngredient = {...state.ingredients[action.payload]};
		return {
			...state,
			editedIngredient:editedIngredient,
			editedIngredientIndex:action.payload
		};
		case ShoppingListActions.STOP_EDIT:
		return {
			...state,
			editedIngredient:null,
			editedIngredientIndex:-1
		};
		default:
			return state;

	}
}