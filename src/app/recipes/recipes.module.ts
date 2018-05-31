import { NgModule } from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import { ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import { CommonModule} from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import {RecipesRoutingModule} from './recipes-routing.module';
import {SharedModule} from '../shared/shared.module';
import {recipeReducer} from './store/recipes.reducers';
import {RecipeEffects} from './store/recipe.effects';
@NgModule({
	declarations:[
	RecipesComponent,
	RecipeStartComponent,
	RecipeListComponent,
	RecipeEditComponent,
	RecipeDetailComponent,
	RecipeItemComponent,
	
	],
	imports:[
	 CommonModule,	
	 SharedModule,
	 ReactiveFormsModule,
	 RecipesRoutingModule,
	 StoreModule.forFeature('recipes',recipeReducer),
	EffectsModule.forFeature([RecipeEffects])	
	]
})
export class RecipeModule {}