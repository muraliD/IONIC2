import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Mydata } from '../../providers/mydata'
import { ToastController } from 'ionic-angular';
/*
  Generated class for the Bankdetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bankdetail',
  templateUrl: 'bankdetail.html'
})
export class BankdetailPage {
  private bank : FormGroup;
  private formType :string;
  private banksObj :any
  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,public serviceData: Mydata,public toastCtrl: ToastController) {

 this.banksObj = [{className: 'State Bank of India', prettyName: 'State Bank of India'},{className: 'State Bank of Hyderabad', prettyName: 'State Bank of Hyderabad'},{className: 'Andhra Bank', prettyName: 'Andhra Bank'},{className: 'Oriental Bank of Commerce', prettyName: 'Oriental Bank of Commerce'},{className: 'ING-VYSYA', prettyName: 'ING-VYSYA'},{className: 'AXIS', prettyName: 'AXIS'},{className: 'KARUR-VYSYA', prettyName: 'KARUR-VYSYA'},{className: 'HDFC', prettyName: 'HDFC'}];   
if(navParams.get('id')){
      this.bank = this.formBuilder.group({
      name: [navParams.get('name'), Validators.required],
      number: [navParams.get('number'),Validators.required],
      ifsc: [navParams.get('ifsc'),Validators.required],
      branch: [navParams.get('branch'),Validators.required]
    });
     this.formType="Update";
  }else{
    this.formType="Add";
      this.clearAllFields()
    }

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BankdetailPage');
  }

  clearAllFields(){
  this.bank = this.formBuilder.group({
      name: ['State Bank of India', Validators.required],
      number: ['',Validators.required],
      ifsc: ['',Validators.required],
      branch: ['',Validators.required]
    });
}
bankForm() {
   var bankDetails=this.bank.value;
   bankDetails.tableName="bank"
if(this.navParams.get('id')){
   bankDetails.qType="update";
   bankDetails.updateID=this.navParams.get('id');
 this.serviceData.insertAndUpdateRecordsIntoTable(bankDetails).then((result) => {
      let toast = this.toastCtrl.create({
      message: 'Bank  added successfully',
      duration: 3000
    });
    toast.present();
    this.clearAllFields()
        }, (error) => {
            console.log("ERROR: ", error);
        });
}else{


 bankDetails.userId=this.navParams.get('userid')
 bankDetails.qType="insert";
 this.serviceData.insertAndUpdateRecordsIntoTable(bankDetails).then((result) => {
      let toast = this.toastCtrl.create({
      message: 'Bank Updated successfully',
      duration: 3000
    });
    toast.present();
        }, (error) => {
            console.log("ERROR: ", error);
        });

}


        
  }


}
