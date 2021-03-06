import {Injectable} from '@angular/core';
import { Actions,Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import {fromPromise } from 'rxjs/observable/fromPromise';
// To convert promise to an observable
// because Effect wants an observable
import * as firebase from 'firebase';
@Injectable()
export class AuthEffects{
	@Effect()
	// handles all actions from our app state
	// ofType to handle specfic action
	authSignup =this.actions$
		.ofType(AuthActions.TRY_SIGNUP) 
		.map((action:AuthActions.TrySignup) =>{
			return action.payload;
		})
		.switchMap((authData:{username:string,password: string}) => {
			return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username,authData.password));
		})
		.switchMap(() => {
			return fromPromise(firebase.auth().currentUser.getIdToken());
		})
		.mergeMap((token:string) => {
			this.router.navigate(['/']);
			
			return [
			{
				type:AuthActions.SIGNUP
			},
			{
				type:AuthActions.SET_TOKEN,
				payload:token
			}

			 ]
		})
		@Effect()
		authSignin =this.actions$
		.ofType(AuthActions.TRY_SIGNIN)
		.map((action:AuthActions.TrySignup) =>{
			return action.payload;
		})
		.switchMap((authData:{username:string,password: string}) => {
			return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username,authData.password));
		})
		.switchMap(() => {
			return fromPromise(firebase.auth().currentUser.getIdToken());
		})
		.mergeMap((token:string) => {
			this.router.navigate(['/']);
			
			return [
			{
				type:AuthActions.SIGNIN
			},
			{
				type:AuthActions.SET_TOKEN,
				payload:token
			}

			 ]
		})
		@Effect({dispatch:false})
		authLogout = this.actions$
		.ofType(AuthActions.LOGOUT)
		.do(() => {
			this.router.navigate(['/']);
		})
	constructor(private actions$:Actions,private router:Router){

	}
}