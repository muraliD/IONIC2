import { Component,NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MainPage } from '../../pages/main/main'; 
import { Mydata } from '../../providers/mydata'
import { LoadingController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import {TranslateService} from 'ng2-translate';
import { loginModel } from '../../models/login'; 
import { Http, Headers } from '@angular/http';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {


googleLoginButtonId = "google-login-button";
  userAuthToken = null;
  userDisplayName = "empty";
    auth2: any;


  login(){
  
this.serviceData.initiateTables().then((result) => {
         console.log(result);
         this.navCtrl.push(MainPage);
        }, (error) => {
            console.log("ERROR: ", error);
        });
  }
  constructor( private _zone: NgZone,public translate: TranslateService,public navCtrl: NavController, public navParams: NavParams,public serviceData: Mydata,public loadingCtrl: LoadingController) {
     translate.setDefaultLang('en');
      translate.use('en');

      
  }
  start() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
       this.auth2 = gapi.auth2.init({
        client_id: '13693516744-od1lpak2p6qp9ktcrqmnot8q2aa1ipjl.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/drive'
      });
      this.attachSignin(document.getElementById('customBtn'));
    });
  };

  attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {

         this._zone.run(() => {
          this.userAuthToken = googleUser.getAuthResponse().id_token;
          this.userDisplayName = googleUser.getBasicProfile().getName();
        });
        },(error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }


  signOut() {
    this.auth2 = gapi.auth2.getAuthInstance();

    this.auth2.signOut().then(() => {
      console.log('User signed out.');
       this._zone.run(() => {
        this.userAuthToken = null;
        this.userDisplayName = "empty";
      });
    });

  }

 listFile() {
        // var request = gapi.client['drive'].files.list({
        //     'pageSize': 10,
        //     'fields': "nextPageToken, files(id, name)"
        //   });

      
      var request = gapi.client.request({
'path': '/drive/v2/files',
'method': 'GET',
'params': {'maxResults': '1'}
});







          request.execute(function(resp) {
            this.appendPre('Files:');
            var files = resp.files;
            if (files && files.length > 0) {
              for (var i = 0; i < files.length; i++) {
                var file = files[i];
                this.appendPre(file.name + ' (' + file.id + ')');
              }
            } else {
              this.appendPre('No files found.');
            }
          });
  }

  appendPre(message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }

       
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }

}
