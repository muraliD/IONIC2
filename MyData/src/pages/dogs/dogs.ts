import { Component,Pipe ,PipeTransform} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewMemberPage } from '../../pages/new-member/new-member';
import { Mydata } from '../../providers/mydata' ; 
import { ToastController } from 'ionic-angular';


/*
  Generated class for the Dogs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dogs',
  templateUrl: 'dogs.html',
})

export class DogsPage {
    public members:any
    public av:any;
    
  constructor(public navCtrl: NavController, public navParams: NavParams,public serviceData: Mydata,public toastCtrl: ToastController) {

    this.av="danger"
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad DogsPage');
  }
  ionViewWillEnter(){
      this.getPersonsDetails()
  }
  personAddMethod(){
    this.navCtrl.push(NewMemberPage)
  }
  editPersonMethod(person){
    this.navCtrl.push(NewMemberPage,person)
  }
  
  getPersonsDetails(){
    this.serviceData.getMembersData().then((result) => {
       this.members=result;
       console.log(this.members);
        }, (error) => {
            console.log("ERROR: ", error);
        });
  }
  deleteMember(id){
    this.serviceData.delete("finance",id).then((result) => {
      this.getPersonsDetails()
     let toast = this.toastCtrl.create({
      message: 'User was Deleted successfully',
      duration: 3000
    });
    toast.present();
        }, (error) => {
            console.log("ERROR: ", error);
        });
  }

}
