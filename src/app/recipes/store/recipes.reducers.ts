import {Recipe } from '../recipes.model';
import {Ingredient} from '../../shared/ingredient.model';
import * as RecipeAction from './recipe.actions';
import * as fromApp from '../../store/app.reducers';
export interface FeatureState extends fromApp.AppState {
	recipes:State;
}

export interface State {
	recipes:Recipe[];
}
const initialState:State ={
	recipes : [
		new Recipe('Kiwi Salad',
			'Healthy and Nutritious',
			'https://images.unsplash.com/photo-1543363136-3fdb62e11be5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
			[
				new Ingredient('Kiwi',2),
				new Ingredient('Corriander',1)
			]),
		new Recipe('Pizza','Must Try',
			'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
		 	[
			new Ingredient('Bread',1),
			new Ingredient('Tomato',2),
			new Ingredient('Jalapeno',2),
			new Ingredient('Paneer',5),
			new Ingredient('Cheese',2)
			]),
		new Recipe('Burger','The best you can have',
			'https://images.unsplash.com/photo-1468071174046-657d9d351a40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=966&q=80',
		 	[
			new Ingredient('Bun',2),
			new Ingredient('Tomato',3),
			new Ingredient('Spinach',3),
			new Ingredient('Cheese slice',2)
			
			]),new Recipe('Waffle Pancake','Mouth-watering',
			'https://images.unsplash.com/photo-1459789034005-ba29c5783491?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
		 	[
			new Ingredient('Chocolate',2),
			new Ingredient('Cashews',10),
			new Ingredient('Ice cream',1),
			])
			,new Recipe('Pasta','Healthy Breakfast',
			'https://images.unsplash.com/photo-1453831362806-3d5577f014a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
		 	[
			new Ingredient('Pasta',2),
			new Ingredient('Tomato',3),
			new Ingredient('Onion',2),
			new Ingredient('Lemon',3)
			]),
			new Recipe('Doughnut','Yummy',
			'https://images.unsplash.com/photo-1472452049192-db15def0be25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
		 	[
			new Ingredient('Cream',2),
			new Ingredient('Sweets',3)
			])
	]
} 

export function recipeReducer(state=initialState,action:RecipeAction.RecipesAction){
	switch (action.type){
		case (RecipeAction.SET_RECIPES):
		return {
			...state,
			recipes:[...action.payload]
		}
		case (RecipeAction.ADD_RECIPES):
		return {
			...state,
			recipes:[...state.recipes,action.payload]
		}
		case (RecipeAction.UPDATE_RECIPES):
		// Fetch the recipe to be updated
		const recipe=state.recipes[action.payload.index];
		const updatedRecipe = {
			...recipe,
			...action.payload.updatedRecipe
		}
		const recipes=[...state.recipes];
		recipes[action.payload.index]=updatedRecipe;
		return {
			...state,
			recipes:recipes
		}
		case(RecipeAction.DELETE_RECIPES):
		const oldRecipes=[...state.recipes];
		oldRecipes.splice(action.payload,1);
		return {
			...state,
			recipes:oldRecipes
		}
		default:
			return state;

	}
}