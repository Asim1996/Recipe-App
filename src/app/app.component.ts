import { Component, OnInit } from '@angular/core';
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
  	apiKey: "AIzaSyBALgY9g4W6DGPbWnO3J80WCEEiWJf5j4M",
    authDomain: "recipe-book-63453.firebaseapp.com"
  	})
  }
}
