import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import { Component,OnInit} from '@angular/core';
import {Response} from '@angular/http';
import {DataStorageService} from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from  '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions'; 
import * as RecipeAction from '../../recipes/store/recipe.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	authState:Observable<fromAuth.State>
	constructor(private dataStorageService:DataStorageService,
				public authService:AuthService,
				private store:Store<fromApp.AppState>){}
	ngOnInit(){
		this.authState =this.store.select('auth');
	}
	onSaveData(){
		// this.dataStorageService.storeRecipes().subscribe(
		// 	(res:Response) => console.log(res))
		this.store.dispatch(new RecipeAction.StoreRecipes());
	}
	onFetchData(){
		// this.dataStorageService.fetchRecipes();
		this.store.dispatch(new RecipeAction.FetchRecipes())
	}
	onLogout(){
		this.store.dispatch(new AuthActions.Logout());
		// this.authService.logout();
	}
}
