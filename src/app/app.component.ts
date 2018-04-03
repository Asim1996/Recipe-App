import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  checkRecipeRoute=false;
  checkShoppingRoute=false;
  onRouteClicked(routeClicked: string){
 	 if(routeClicked==='recipe'){
 	 	this.checkRecipeRoute=true;
 	 	this.checkShoppingRoute=false;
 	 }else{
 	 	this.checkShoppingRoute=true;
  		this.checkRecipeRoute=false;
 	 }
 	 
  }
}
