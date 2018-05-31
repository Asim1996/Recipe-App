import {EventEmitter,Injectable} from '@angular/core';
import { Recipe } from './recipes.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';
@Injectable()
export class RecipeService{
	recipesChanged = new Subject<Recipe[]>();
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
	setRecipes(recipes:Recipe[]){
		this.recipes=recipes;
		this.recipesChanged.next(this.recipes.slice());
	}
	// getRecipe(index:number){
	// 	return this.recipes[index];
	// }
	// addIngredientsToShoppingList(ingredients:Ingredient[]){
	// 	this.slService.addIngredients(ingredients)
	// }
	// addRecipe(recipe:Recipe){
	// 		this.recipes.push(recipe);
	// 		 this.recipesChanged.next(this.recipes.slice());
	// }
	// updateRecipe(index:number,newRecipe:Recipe){
	// 	this.recipes[index]=newRecipe;
	// 	 this.recipesChanged.next(this.recipes.slice());
	// }
	// deleteRecipe(index:number){
	// 	this.recipes.splice(index,1);
	// 	 this.recipesChanged.next(this.recipes.slice());
	// }
}