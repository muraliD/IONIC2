import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewPersonPage } from '../../pages/new-person/new-person';
import { Mydata } from '../../providers/mydata'
import { BanksPage } from '../../pages/banks/banks';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
   providers:[Mydata]
})
export class HomePage {
    public persons:any
ionViewDidLoad() {
    console.log("I'm alive!");
  }
  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
  }
  ionViewWillEnter(){
      this.getPersonsDetails()
  }
  constructor(public navCtrl: NavController,public serviceData: Mydata) {
    
  }
  getPersonsDetails(){
    this.serviceData.getPersonsData().then((result) => {
       this.persons=result;
     
        }, (error) => {
            console.log("ERROR: ", error);
        });
  }
  personAddMethod(){

    this.navCtrl.push(NewPersonPage)

  }
  editPersonMethod(person){
    this.navCtrl.push(NewPersonPage,person)
  }
  myBanks(id){
         this.navCtrl.push(BanksPage,{userid:id})
  }
  deleteMember(id){
    this.serviceData.delete("members",id).then((result) => {
      this.getPersonsDetails()
     
        }, (error) => {
            console.log("ERROR: ", error);
        });
  }

}
