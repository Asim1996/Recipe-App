import { Component, OnInit, Injectable} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';

import {Recipe} from '../recipes.model';
import { RecipeService } from '../recipe.service';
import {Store} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers';
import * as fromApp from '../../store/app.reducers'; 
import {Observable} from 'rxjs/observable';
import * as fromRecipe from '../store/recipes.reducers';
import * as RecipeAction from '../store/recipe.actions';
@Injectable()
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	recipeState:Observable<fromRecipe.State>;
  id:number;
  constructor(private recipeService:RecipeService,
              private route:ActivatedRoute,
              private router:Router,
              private store:Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe((
      params: Params) => {
      this.id = +params['id'];
      this.recipeState= this.store.select('recipes');
     });
  }
   onAddtoShoppingList(){
     this.store.select('recipes')
     .take(1)
     .subscribe((recipeState:fromRecipe.State) => {
      this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients))
       
     });
    
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
onEditRecipe(){
  this.router.navigate(['edit'],{relativeTo:this.route});
  // this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});
}
onDelete(){
  this.store.dispatch(new RecipeAction.DeleteRecipe(this.id));
// this.recipeService.deleteRecipe(this.id);
this.router.navigate(['../']);
}
}
