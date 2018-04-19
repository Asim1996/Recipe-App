import { Component, OnInit } from '@angular/core';
import { appConfig } from './app.config';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  ngOnInit(){
  	firebase.initializeApp({
  	apiKey: appConfig.apiKey,
    authDomain: appConfig.authDomain
  	})
  }
}
