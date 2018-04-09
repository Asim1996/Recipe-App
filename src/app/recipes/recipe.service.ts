import {EventEmitter,Injectable} from '@angular/core';
import { Recipe } from './recipes.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
@Injectable()
export class RecipeService{
	recipeSelected= new EventEmitter<Recipe>();
	private recipes: Recipe[]=[
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
	
	];
	constructor(private slService:ShoppingListService){}
	getRecipes(){
		return this.recipes.slice();
	}
	getRecipe(index:number){
		return this.recipes[index];
	}
	addIngredientsToShoppingList(ingredients:Ingredient[]){
		this.slService.addIngredients(ingredients)
	}
}