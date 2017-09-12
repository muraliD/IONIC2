import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Mydata } from '../../providers/mydata' ; 
import { ToastController } from 'ionic-angular';
import {globalStrings} from '../../constants/queries';
import { AlertController } from 'ionic-angular';
/*
  Generated class for the Category page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {
private catObj:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public serviceData: Mydata,public toastCtrl: ToastController,public alertCtrl: AlertController) {
  this.getAllCategories();

  }

  getAllCategories(){
    this.serviceData.getMasterData(globalStrings.getMasterCategories).then((result) => {
     this.catObj=result;

     }, (error) => {
            console.log("ERROR: ", error);
        });

  }
  deleteitem(id){
    this.serviceData.delete(globalStrings.categoryTableName,id).then((result) => {
      this.getAllCategories()
     
        }, (error) => {
            console.log("ERROR: ", error);
        });

  }
categoryAddMethod(){
this.showPrompt("Save",{});
}
updateCat(catObj){
this.showPrompt("Update",catObj);
}
showPrompt(val,obj) {
    let prompt = this.alertCtrl.create({
      title: 'Category',
      inputs: [
        {
          name: 'Category',
          placeholder: 'Category',
          value: obj.name
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log(data.Category+'Cancel clicked');
          }
        },
        {
          text: val,
          handler: data => {
            if(obj.id){
              console.log(data.Category+'idclicked');
              this.addOrUpdateCategory({id:obj.id,name:data.Category})
            }else{
              this.addOrUpdateCategory({name:data.Category})
            }
          }
        }
      ]
    });
    prompt.present();
  }

addOrUpdateCategory(data){
  this.serviceData.addAndUpdateMasterTables(globalStrings.categoryTableName,data).then((result) => {
    this.getAllCategories();
     }, (error) => {
            console.log("ERROR: ", error);
        });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

}
