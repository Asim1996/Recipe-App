import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service'; 
import { Recipe } from '../recipes/recipes.model';
import { appConfig} from '../app.config';
import 'rxjs/Rx';
@Injectable()
export class DataStorageService{
	firebaseUrl=appConfig.apiUrl;
	
	constructor(private http:Http,private recipeService:RecipeService){}
	storeRecipes(){
  return this.http.put(this.firebaseUrl,this.recipeService.getRecipes());
	}
	fetchRecipes(){
		this.http.get(this.firebaseUrl)
		.map(
			(response:Response) => {
			const recipes:Recipe[] =response.json();
			for(let recipe of recipes){
				if(!recipe['ingredients']){
					console.log(recipe);
					recipe['ingredients'] = [];
				}
			}
			return recipes;	
			})
		.subscribe(
			(recipes:Recipe[]) => {
				this.recipeService.setRecipes(recipes);	
			});
	}

}