import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import * as firebase from 'firebase';
import { LoginPage } from '../pages/login/login';
export const config = {
  apiKey: "AIzaSyBNTQQOSzuMCNuBRBEl05grJNwBe6Z6xjw",
    authDomain: "examen-ba1f6.firebaseapp.com",
    databaseURL: "https://examen-ba1f6.firebaseio.com",
    projectId: "examen-ba1f6",
    storageBucket: "examen-ba1f6.appspot.com",
    messagingSenderId: "821679513412",
    appId: "1:821679513412:web:0be26de6579ee542"
};
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}

