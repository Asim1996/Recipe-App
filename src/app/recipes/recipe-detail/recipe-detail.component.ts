import { Component, OnInit, Injectable} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';

import {Recipe} from '../recipes.model';
import { RecipeService } from '../recipe.service';
@Injectable()
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	recipe:Recipe;
  id:number;
  constructor(private recipeService:RecipeService,
              private route:ActivatedRoute,
              private router:Router) { }
  onAddtoShoppingList(){
  	this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  ngOnInit() {
    this.route.params.subscribe((
      params: Params) => {
      this.id = +params['id'];
      this.recipe= this.recipeService.getRecipe(this.id);
      console.log(this.recipe);
    });
  }
onEditRecipe(){
  this.router.navigate(['edit'],{relativeTo:this.route});
  // this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});
}
onDelete(){
this.recipeService.deleteRecipe(this.id);
this.router.navigate(['../']);
}
}
