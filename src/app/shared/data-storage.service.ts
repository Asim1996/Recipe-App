import {Injectable} from '@angular/core';
import { HttpClient,HttpRequest } from '@angular/common/http';
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
  return this.http.put(this.firebaseUrl,this.recipeService.getRecipes());
	// A more advanced request
	// Useful when uploading or downloading something
	// const req=new HttpRequest('PUT','this.firebaseUrl',this.recipeService.getRecipes(),{reportProgress:true});
	// return this.http.request(req);
	}
	
	
	fetchRecipes(){
		this.http.get<Recipe[]>(this.firebaseUrl,{
			observe:'body',
			responseType:'json'
		})
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