import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from'../recipes.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
	// Type of recipe is an array of recipe model 
 @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[]=[
		new Recipe('A test Recipe','This is a simple test','https://images.pexels.com/photos/691114/pexels-photo-691114.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'),
		new Recipe('Another test Recipe','This is a simple test','https://images.pexels.com/photos/691114/pexels-photo-691114.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb')
	
	]
  constructor() { }

  ngOnInit() {
  }
  onRecipeSelected(recipe:Recipe){
    this.recipeWasSelected.emit(recipe);
  }
}
