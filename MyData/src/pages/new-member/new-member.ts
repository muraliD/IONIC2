import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Mydata } from '../../providers/mydata'
import { ToastController } from 'ionic-angular';
@Component({
  selector: 'page-new-member',
  templateUrl: 'new-member.html'
})
export class NewMemberPage {
private member : FormGroup;
private formType :string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,public serviceData: Mydata,public toastCtrl: ToastController) {

     if(navParams.data.id){
      this.formType="Update";
      this.member = this.formBuilder.group({
     date: [ new Date(navParams.data.date).toISOString(), Validators.required],
      name: [navParams.data.name, Validators.required],
      amount: [navParams.data.amount,Validators.required],
      intrest: [navParams.data.intrest, Validators.required],
      mobile: [navParams.data.mobile,Validators.required],
      village: [navParams.data.village,Validators.required],
      desc: [navParams.data.desc,Validators.required]
    });
  }else{
    this.formType="Add";
      this.clearAllFields() 
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewMemberPage');
  }
  clearAllFields(){

    
  this.member = this.formBuilder.group({
      date: [ new Date().toISOString(), Validators.required],
      name: ['', Validators.required],
      amount: ['',Validators.required],
      intrest: ['', Validators.required],
      mobile: ['',Validators.required],
      village: ['',Validators.required],
      desc: ['',Validators.required]
    });
}
memberAdd(){
  var memberData = this.member.value
  memberData.tableName="finance";
if(this.navParams.data.id){
  memberData.qType="update";
  memberData.updateID=this.navParams.data.id;
this.serviceData.insertAndUpdateRecordsIntoTable(memberData).then((result) => {
   let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000
    });
    toast.present();
    this.clearAllFields()
        }, (error) => {
            console.log("ERROR: ", error);
        });
}else{
  
  memberData.qType="insert";
this.serviceData.insertAndUpdateRecordsIntoTable(memberData).then((result) => {
      let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000
    });
    toast.present();
    this.clearAllFields()
        }, (error) => {
            console.log("ERROR: ", error);
        });
}
  
}




}
