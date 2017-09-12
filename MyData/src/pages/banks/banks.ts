import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BankdetailPage } from '../../pages/bankdetail/bankdetail';
import { Mydata } from '../../providers/mydata'
/*
  Generated class for the Banks page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-banks',
  templateUrl: 'banks.html'
})
export class BanksPage {
public banks:any
  constructor(public navCtrl: NavController, public navParams: NavParams,public serviceData: Mydata) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BanksPage');
  }
  ionViewWillEnter(){
      this.getbankDetails()
  }
  bankAddMethod(){
    this.navCtrl.push(BankdetailPage,{userid:this.navParams.get('userid')})  
  }
  editbankMethod(bank){
    this.navCtrl.push(BankdetailPage,bank)
  }
  deleteBank(id){
     this.serviceData.delete("bank",id).then((result) => {
       this.getbankDetails()
        }, (error) => {
            console.log("ERROR: ", error);
        });
  }
  getbankDetails(){
    this.serviceData.getBanksData(this.navParams.get('userid')).then((result) => {
       this.banks=result;
        }, (error) => {
            console.log("ERROR: ", error);
        });
  }

}
