import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service'; 
import { Recipe } from '../recipes/recipes.model';
import { appConfig} from '../app.config';
import { AuthService } from '../auth/auth.service';
import 'rxjs/Rx';
@Injectable()
export class DataStorageService{
	firebaseUrl=appConfig.apiUrl;
	
	constructor(private http:HttpClient,private recipeService:RecipeService,private authService:AuthService){}
	storeRecipes(){
  const token=this.authService.getToken();
  return this.http.put(this.firebaseUrl,this.recipeService.getRecipes());
	}
	
	
	fetchRecipes(){
		const token=this.authService.getToken();
		this.http.get<Recipe[]>(this.firebaseUrl)
		.map(
			(recipes) => {
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