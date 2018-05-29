import {Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { Recipe } from'../recipes.model';
import {RecipeService} from '../recipe.service';
import {Router, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as fromRecipe from '../store/recipes.reducers';
import {Observable} from 'rxjs/observable';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
	// Type of recipe is an array of recipe model 
 recipeState: Observable<fromRecipe.State>;
  constructor(private recipeService:RecipeService,
  				private router:Router,private route:ActivatedRoute,private store:Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
   //  this.subscription=this.recipeService.recipesChanged.subscribe(
   //    (recipes:Recipe[]) => {
   //      this.recipes=recipes;
   //    })
   // this.recipes =this.recipeService.getRecipes();
  this.recipeState=this.store.select('recipes');
  }

  onNewRecipe(){
  	this.router.navigate(['new'],{relativeTo:this.route});
  }
 
}
