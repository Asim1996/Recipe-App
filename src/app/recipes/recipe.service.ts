import {EventEmitter} from '@angular/core';
import { Recipe } from './recipes.model';
export class RecipeService{
	recipeSelected= new EventEmitter<Recipe>();
	private recipes: Recipe[]=[
		new Recipe('A test Recipe','This is a simple test','https://images.pexels.com/photos/691114/pexels-photo-691114.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'),
		new Recipe('Another test Recipe','This is a simple test','https://images.pexels.com/photos/691114/pexels-photo-691114.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb')
	
	];
	getRecipes(){
		return this.recipes.slice();
	}
}