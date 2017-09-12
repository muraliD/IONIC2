import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';
import { Mydata } from '../providers/mydata'
import {BankdetailPage} from '../pages/bankdetail/bankdetail';
import {CalendarPage} from '../pages/calendar/calendar';
import {MyHomePage} from '../pages/my-home/my-home'; 
import {SettingsPage} from '../pages/settings/settings'; 
@Component({
  templateUrl: 'app.html',
  providers:[Mydata]
})
export class MyApp {

  rootPage = LoginPage;

  constructor(platform: Platform,public serviceData: Mydata) {
    platform.ready().then(() => {
      StatusBar.overlaysWebView(false);
      StatusBar.backgroundColorByHexString('#18392b');
      StatusBar.styleDefault();
      Splashscreen.hide();
       platform.registerBackButtonAction(function (event) {
    event.preventDefault();
}, 100);
      
    });
  }
}
