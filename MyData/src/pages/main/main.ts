
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CatsPage } from '../cats/cats';
import { DogsPage } from '../dogs/dogs';
import {CalendarPage} from '../calendar/calendar';
import {MyHomePage} from '../my-home/my-home'; 
import {SettingsPage} from '../settings/settings'; 



@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  private rootPage;
  private myHomePage;
  private calendarPage;
  private homePage;
  private imagesPage;
  private financePage;
  private settingsPage;
  private sidemenuArray:any;
  private lastmenuItem:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.rootPage = MyHomePage;
    this.myHomePage=MyHomePage;
    this.calendarPage = CalendarPage;
    this.homePage = HomePage;
    this.imagesPage = CatsPage;
    this.financePage = DogsPage;
    this.settingsPage = SettingsPage;
    this.sidemenuArray=[{name:"DashBoard",icon:"analytics",color:"grayCol",page:this.myHomePage},{name:"MyCalendar",icon:"calendar",color:"light",page:this.calendarPage},{name:"Family",icon:"people",color:"light",page:this.homePage},{name:"Finance",icon:"logo-usd",color:"light",page:this.financePage},{name:"Settings",icon:"cog",color:"light",page:this.settingsPage},{name:"Logout",icon:"log-out",color:"light"}];
    this.lastmenuItem=this.sidemenuArray[0];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }
  logout(){
    this.navCtrl.pop()
  }
  openPage(menu) {
    if(menu.name=="Logout"){
      this.lastmenuItem.color="light";
      this.logout();
    }else{
    this.lastmenuItem.color="light";
    this.rootPage = menu.page;
    menu.color="grayCol"
    this.lastmenuItem=menu;
    }
    
  }

}