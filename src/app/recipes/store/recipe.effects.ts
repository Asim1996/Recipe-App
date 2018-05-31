import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

import {Actions,Effect} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import * as RecipeActions from '../store/recipe.actions';
import {Recipe} from '../recipes.model';
import { appConfig} from '../../app.config';
import * as fromRecipe from '../store/recipes.reducers';
@Injectable()
export class RecipeEffects{
	firebaseUrl=appConfig.apiUrl;
	@Effect()
	recipeFetch=this.action$
	.ofType(RecipeActions.FETCH_RECIPES)
	.switchMap((action:RecipeActions.FetchRecipes) => {
	return this.httpClient.get<Recipe[]>(this.firebaseUrl,{
			observe:'body',
			responseType:'json'
		})
       })
        .map(
			(recipes) => {
			for(let recipe of recipes){
				if(!recipe['ingredients']){
					console.log(recipe);
					recipe['ingredients'] = [];
				}
			}
			return {
				type:RecipeActions.SET_RECIPES,
				payload:recipes
			}

			});
	@Effect({dispatch:false})
	recipeStore = this.action$
	.ofType(RecipeActions.STORE_RECIPES)
	.withLatestFrom(this.store.select('recipes'))
	.switchMap(([action, state]) => {
	 return this.httpClient.put(this.firebaseUrl,state.recipes);
	});
	constructor(private action$:Actions,
		private httpClient:HttpClient,
	    private store:Store<fromRecipe.FeatureState>){}
}