import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers'
import 'rxjs/add/operator/switchMap';
import {HttpEvent,HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../auth/auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService:AuthService,private store:Store<fromApp.AppState>) {}
	intercept(req:HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>> {
		// Avoud using the same request it will break at some time
		// Gives exact copy of request
		// const copiedReq=req.clone({headers:req.headers.set('','')});
		// const copiedReq=req.clone({params:req.params.set('auth',this.authService.getToken())})
		// console.log('Intercepted',req);
		return this.store.select('auth')
		.take(1)
		.switchMap((authState:fromAuth.State) => {
		const copiedReq=req.clone({params:req.params.set('auth',authState.token)})
		return next.handle(copiedReq);	
		})
		// return next.handle(copiedReq);
	}
}