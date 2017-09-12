import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NewRecordPage} from '../../pages/new-record/new-record'; 
import { Mydata } from '../../providers/mydata'
import moment from 'moment';
/*
  Generated class for the DetailRecord page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail-record',
  templateUrl: 'detail-record.html'
})
export class DetailRecordPage {
private records:any
private type:string
  constructor(public navCtrl: NavController, public navParams: NavParams,public serviceData: Mydata) {
   this.type=this.navParams.data.objtype==1?"Income":"Expense";
  }
  editRecordMethod(record){
  this.navCtrl.push(NewRecordPage,record)
}
deleteMember(id){
 this.serviceData.delete("expense",id).then((result) => {
      this.getdetailData()
     
        }, (error) => {
            console.log("ERROR: ", error);
        });
}
ionViewWillEnter(){
      this.getdetailData()
  }
getdetailData(){
        
 var datestring=moment(this.navParams.data.date).format('YYYY-MM-DD');
    this.serviceData.getexpensedata1(this.navParams.data.objtype,datestring).then((result) => {
       this.records=result;
     
        }, (error) => {
            console.log("ERROR: ", error);
        });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailRecordPage');
  }

}
