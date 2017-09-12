import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { CatsPage } from '../pages/cats/cats';
import { DogsPage } from '../pages/dogs/dogs';
import { LoginPage } from '../pages/login/login';
import { DetailPage } from '../pages/detail/detail';
import { NewPersonPage } from '../pages/new-person/new-person';
import { NewMemberPage } from '../pages/new-member/new-member';
import {ArrayFilterPipe} from '../pipes/group-by-pipe'; 
import {BanksPage} from '../pages/banks/banks';
import {BankdetailPage} from '../pages/bankdetail/bankdetail';  
import {NewRecordPage} from '../pages/new-record/new-record'; 
import {DetailRecordPage} from '../pages/detail-record/detail-record'; 
import {MyHomePage} from '../pages/my-home/my-home'; 

import {SettingsPage} from '../pages/settings/settings'; 
import {CategoryPage} from '../pages/category/category'; 

import { TranslateLoader,TranslateService,TranslateStaticLoader,TranslateModule} from 'ng2-translate/ng2-translate';
import { Http , Response, Headers, RequestOptions} from '@angular/http';

//Calendar
import {CalendarPage} from '../pages/calendar/calendar';
import { NgCalendarModule } from 'ionic2-calendar';
export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    CatsPage,
    DogsPage,
    LoginPage,
    DetailPage,
    NewPersonPage,
    NewMemberPage,
    ArrayFilterPipe,
    BanksPage,
    BankdetailPage,
    CalendarPage,
    NewRecordPage,
    DetailRecordPage,
    MyHomePage,
    SettingsPage,
    CategoryPage
  ],
  imports: [
    NgCalendarModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  exports: [ArrayFilterPipe],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    CatsPage,
    DogsPage,
    LoginPage,
    DetailPage,
    NewPersonPage,
    NewMemberPage,
    BanksPage,
    BankdetailPage,
    CalendarPage,
    NewRecordPage,
    DetailRecordPage,
    MyHomePage,
    SettingsPage,
    CategoryPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
