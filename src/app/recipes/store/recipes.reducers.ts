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
		new Recipe('Tasty Schnitzel',
			'just awesome',
			'https://images.pexels.com/photos/691114/pexels-photo-691114.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
			[
				new Ingredient('Meat',1),
				new Ingredient('French Fries',20)
			]),
		new Recipe('Burger','Good',
			'https://images.pexels.com/photos/691114/pexels-photo-691114.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
			[
			new Ingredient('Bun',2),
			new Ingredient('Tomato',3)
			
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