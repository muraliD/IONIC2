import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Mydata } from '../../providers/mydata'
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-new-person',
  templateUrl: 'new-person.html',
   providers:[Mydata]
})

export class NewPersonPage {
private Person : FormGroup;
private formType :string;
private genderObject :any;
  logForm() {
var personData = this.Person.value
personData.tableName="members"
 if(this.navParams.get('id')){
   personData.qType="update";
   personData.updateID=this.navParams.get('id');
 this.serviceData.insertAndUpdateRecordsIntoTable(personData).then((result) => {
   let toast = this.toastCtrl.create({
      message: 'User was updated successfully',
      duration: 3000
    });
    toast.present();
 }, (error) => {
            console.log("ERROR: ", error);
        });


 }else{

personData.qType="insert";
this.serviceData.insertAndUpdateRecordsIntoTable(personData).then((result) => {
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

clearAllFields(){

this.genderObject = [{className: 'Male', prettyName: 'Male'},{className: 'Female', prettyName: 'Female'}];

  this.Person = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['Male', Validators.required],
      dob: [new Date().toISOString(), Validators.required],
      aadhar: ['',Validators.required],
      mobile: ['',Validators.required],
      email: ['',Validators.required],
      passport: [''],
      ration: [''],
      pan: ['']
    });
}

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,public serviceData: Mydata,public toastCtrl: ToastController) {
    
    if(navParams.get('id')){
      this.genderObject = [{className: 'Male', prettyName: 'Male'},{className: 'Female', prettyName: 'Female'}];
      this.formType="Update";
      this.Person = this.formBuilder.group({
      name: [navParams.get('name'), Validators.required],
      gender: [navParams.get('gender'), Validators.required],
      dob: [navParams.get('dob'), Validators.required],
      aadhar: [navParams.get('aadhar'),Validators.required],
      mobile: [navParams.get('mobile'),Validators.required],
      email: [navParams.get('email'),Validators.required],
      passport: [navParams.get('passport')],
      ration: [navParams.get('ration')],
      pan: [navParams.get('pan')]
    });
  }else{
    this.formType="Add";
      this.clearAllFields()
    }
    
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPersonPage');
  }

}
