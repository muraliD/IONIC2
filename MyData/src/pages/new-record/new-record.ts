import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Mydata } from '../../providers/mydata'
import { ToastController } from 'ionic-angular';
import moment from 'moment';
import {globalStrings} from '../../constants/queries';
import { Expence } from '../../models/expence';
/*
  Generated class for the NewRecord page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-new-record',
  templateUrl: 'new-record.html'
})
export class NewRecordPage {
private newRecord : FormGroup;
private typeObj:any;
private catObj:any;
private btnTitle:string
  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,public serviceData: Mydata,public toastCtrl: ToastController) {
    this.clearAllFields();
  }
   ionViewWillEnter(){
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewRecordPage');
  }
  newRecordForm(){ 

var expenceData=this.newRecord.value;
    expenceData.tableName="expense"     
if(this.navParams.data.id){
  expenceData.qType="update";
  expenceData.updateID=this.navParams.data.id;
  this.serviceData.insertAndUpdateRecordsIntoTable(expenceData).then((result) => {
      let toast = this.toastCtrl.create({
      message: 'User was updated successfully',
      duration: 3000
    });
    toast.present();
    this.newRecord = this.formBuilder.group({
      date: [moment(this.navParams.data).format('MMMM Do YYYY'), Validators.required],
      type: ['1', Validators.required],
      cat: ['Vegitables', Validators.required],
      amount: ['',Validators.required],
      desc: ['',Validators.required]
    });
        }, (error) => {
            console.log("ERROR: ", error);
        });
}else{

  expenceData.expDate=this.navParams.data
  expenceData.qType="insert";
this.serviceData.insertAndUpdateRecordsIntoTable(expenceData).then((result) => {
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


this.typeObj = [{className: '1', prettyName: 'Income'},{className: '2', prettyName: 'Expense'}];
this.newRecord = this.formBuilder.group({
      date: [moment(this.navParams.data).format('MMMM Do YYYY'), Validators.required],
      type: ['', Validators.required],
      cat: ['', Validators.required],
      amount: ['',Validators.required],
      desc: ['',Validators.required]
    });

 this.serviceData.getMasterData(globalStrings.getMasterCategories).then((result) => {
    
    this.catObj=result
    var typeId:string=this.catObj[0]["id"]
    if(this.navParams.data.id){
 this.btnTitle="Update"
this.newRecord = this.formBuilder.group({
      date: [moment(this.navParams.data.date).format('MMMM Do YYYY'), Validators.required],
      type: [this.navParams.data.type, Validators.required],
      cat: [this.navParams.data.cat, Validators.required],
      amount: [this.navParams.data.amount,Validators.required],
      desc: [this.navParams.data.desc,Validators.required]
    });
}else{
  this.btnTitle="Add"
  this.newRecord = this.formBuilder.group({
      date: [moment(this.navParams.data).format('MMMM Do YYYY'), Validators.required],
      type: [2, Validators.required],
      cat: [typeId, Validators.required],
      amount: ['',Validators.required],
      desc: ['',Validators.required]
    });
  
}


     }, (error) => {
            console.log("ERROR: ", error);
        });



// this.catObj = [{className: 'Vegitables', prettyName: 'Vegitables'},{className: 'Meat', prettyName: 'Meat'},{className: 'Fish', prettyName: 'Fish'},{className: 'Chicken', prettyName: 'Chicken'},{className: 'Milk', prettyName: 'Milk'},{className: 'PowerBill', prettyName: 'PowerBill'},{className: 'PhoneBill', prettyName: 'PhoneBill'},{className: 'Kirana', prettyName: 'Kirana'},{className: 'Fruits', prettyName: 'Fruits'},{className: 'Temple', prettyName: 'Temple'},{className: 'Medical', prettyName: 'Medical'},{className: 'Petrol', prettyName: 'Petrol'},{className: 'Finance', prettyName: 'Finance'},{className: 'tiffin', prettyName: 'tiffin'}];


  
}

}
