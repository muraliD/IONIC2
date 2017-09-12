import { Injectable } from '@angular/core';
import { Component, Input } from '@angular/core';
import { Http , Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {SQLite } from 'ionic-native';
import { LoadingController } from 'ionic-angular';
import moment from 'moment';
import {globalStrings} from '../constants/queries';

@Injectable()
export class Mydata {
  //Define Variables  
  public storage: SQLite;
  private isOpen: boolean;
  public result;
  public isTablesInitiated: boolean
  //Add Loader  
  public loader = this.loadingCtrl.create({
      content: "initiate Data wait...",
    });
  //Initiate Constructor
  constructor(public loadingCtrl: LoadingController,public http: Http) {
   this.storage = new SQLite();   
  }
  //Create Tables 
  initiateTables(){
    
        return new Promise((resolve, reject) => {  
        if(this.isTablesInitiated==true){
          this.loader.present();
          this.storage.openDatabase(globalStrings.mainDB).then(() => {
               Observable.forkJoin([this.createTable(globalStrings.membersTable),this.createTable(globalStrings.financeTable),this.createTable(globalStrings.bankTable),this.createTable(globalStrings.expenseTable),this.createAndAddMasterRecords(globalStrings.categoryTableName)])
       .subscribe((response) => {
          this.loader.dismiss();
             this.isTablesInitiated=true;
             resolve(response);
          
       });  
            }, (error) => {
                   this.isTablesInitiated=false;
                this.loader.dismiss();
                 reject(error);
            });
        }else{
             resolve("");
        }


          })
  }
  //Create and  update Master Tables


  createAndAddMasterRecords(tablename){
   return new Promise((resolve, reject) => {
       var query:string=globalStrings.isexistTable+"'" + tablename + "'";
        this.storage.executeSql(query,[]).then((data) => {
         if(data.rows.item(0).count==0){
            this.storage.executeSql(globalStrings.masterTableCreation(tablename), []).then((maindata) => {
            this.http.get(globalStrings.CategoriesJsonPath).map(res => res.json()).subscribe(data => {
                 var query =globalStrings.addMasterTableRecords(tablename);
                 var datas = [];
                 var rowArgs = [];
                 data.forEach(function (category) {   //Multiple Records Insertion
                     var cat:string=category.name
                         rowArgs.push("(?, ?)");
                         datas.push(cat);
                         datas.push(new Date()); 
                     });
                 query += rowArgs.join(",");
                 this.storage.executeSql(query, datas).then((finalData) => {
                resolve(finalData);
            }, (error) => {
                reject(error);
            });

         });
            }, (error) => {
                reject(error);
            }); 

         }else{
             resolve('');
         }

            }, (error) => {
                reject(error);
            });
        });

  }
 //Create Tables
  createTable(query){
  return new Promise((resolve, reject) => {
            this.storage.executeSql(query, []).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
  }
  //DeleteTables
  delete(tabelname,id) { 
     return new Promise((resolve, reject) => { 
            this.storage.executeSql(globalStrings.deleteTableRecords(tabelname), [id]).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }

  //Insert And Update Tables
  insertAndUpdateRecordsIntoTable(data){

      var recordsData=[];
      var insertQuery:string;
   
        if(globalStrings.membersTableName == data.tableName)
            {
            if(data.qType == globalStrings.insert) 
               {
                recordsData=[new Date(),data.name,data.gender,data.dob,data.aadhar,data.mobile,data.email,data.passport,data.ration,data.pan];
                insertQuery=globalStrings.membersInsertion;
               }
            if(data.qType == globalStrings.update) 
               {
                recordsData=[data.date,data.name,data.gender,data.dob,data.aadhar,data.mobile,data.email,data.passport,data.ration,data.pan,data.updateID];
                insertQuery=globalStrings.membersUpdate;
               }
            }
       if(globalStrings.financeTableName == data.tableName)
            {
            if(data.qType == globalStrings.insert) 
               {
                 recordsData=[new Date(),data.name,data.amount,data.intrest,data.mobile,data.village,data.about,""];
                 insertQuery=globalStrings.financeInsertion;
               } 
             if(data.qType == globalStrings.update) 
               {
                recordsData=[data.date,data.name,data.amount,data.intrest,data.mobile,data.village,data.desc,data.total,data.updateID];
                insertQuery=globalStrings.financeUpdate;
               }   
            }
       if(globalStrings.bankTableName == data.tableName)
            {
             if(data.qType == globalStrings.insert) 
               {   
                recordsData=[new Date(),data.name,data.number,data.ifsc,data.branch,data.userId];
                insertQuery=globalStrings.bankInsertion;
               }
               if(data.qType == globalStrings.update) 
               {
                recordsData=[data.date,data.name,data.number,data.ifsc,data.branch,data.updateID];
                insertQuery=globalStrings.banksUpdate;
               } 
            }
       if(globalStrings.expenseTableName == data.tableName)
            {
              if(data.qType == globalStrings.insert) 
               {
                recordsData=[data.expDate,moment(data.expDate).format('YYYY-MM-DD'),data.type,data.cat,data.amount,data.desc];
                insertQuery=globalStrings.expenseInsertion;
               }
               if(data.qType == globalStrings.update) 
               {
                recordsData=[data.type,data.cat,data.amount,data.desc,data.updateID];
                insertQuery=globalStrings.expenseUpdate;
               }
            }
 

      return new Promise((resolve, reject) => {
           this.storage.openDatabase(globalStrings.mainDB).then(() => {
            this.storage.executeSql(insertQuery, recordsData).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
           })
        });
  }  
    getMasterData(query){

     return new Promise((resolve, reject) => {
         this.storage.openDatabase(globalStrings.mainDB).then(() => {
            this.storage.executeSql(query, []).then((data) => {
                let people = [];
              
                if(data.rows.length > 0) {
                    
                    for(let i = 0; i < data.rows.length; i++) {
                    
                        people.push({
                            id: data.rows.item(i).id,
                            date: data.rows.item(i).date,
                            name: data.rows.item(i).name,

                        });   
                    }
                }
                resolve(people);
            }, (error) => {
                reject(error);
            });
         })
        });

  }
  addAndUpdateMasterTables(tablename,obj){
   var query;

   var data = []; 
    if(obj.id){
     query =globalStrings.catUpdate; 
     data.push(new Date())
     data.push(obj.name)
     data.push(obj.id)
    }else{
     data.push(new Date())
     data.push(obj.name)
       query =globalStrings.catAdd; 
    }  

    return new Promise((resolve, reject) => {
            this.storage.executeSql(query, data).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
  
  }
  

    getPersonsData() {
     return new Promise((resolve, reject) => {
         this.storage.openDatabase(globalStrings.mainDB).then(() => {
            this.storage.executeSql("SELECT * FROM members", []).then((data) => {
                let people = [];
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                        people.push({
                            id: data.rows.item(i).id,
                            date: data.rows.item(i).date,
                            name: data.rows.item(i).name,
                            gender: data.rows.item(i).gender,
                            dob: data.rows.item(i).dob,
                            aadhar: data.rows.item(i).aadhar,
                            mobile: data.rows.item(i).mobile,
                            email: data.rows.item(i).email,
                            passport: data.rows.item(i).passport,
                            ration: data.rows.item(i).ration,
                            pan: data.rows.item(i).pan

                        });
                    }
                }
                resolve(people);
            }, (error) => {
                reject(error);
            });
         })
        });

   }
   

   getCounts(date){
     return new Promise((resolve, reject) => {  
          this.storage.openDatabase(globalStrings.mainDB).then(() => {
           
               Observable.forkJoin([this.expencecount(date,"1"),this.expencecount(date,"2")])
       .subscribe((response) => {
     
             resolve(response);
       });  
            }, (error) => {
               
              
                 reject(error);
            });
          })
   }

   expencecount(date1,type){
       
       return new Promise((resolve, reject) => {
         this.storage.openDatabase(globalStrings.mainDB).then(() => {
            this.storage.executeSql("select sum(amount) as count from expense WHERE datestring = (?) AND type = (?)", [date1,type]).then((data) => {
                let people = [];
              
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                         resolve(data.rows.item(i).count)
                     }
                }
                
            }, (error) => {
                reject(error);
            });
         })
        });
   } 
   getexpensedata1(type,date1){

       return new Promise((resolve, reject) => {
         this.storage.openDatabase(globalStrings.mainDB).then(() => {
            this.storage.executeSql("SELECT expense.id,expense.date,expense.type,expense.cat,expense.amount,expense.desc,expense.datestring,categories.name FROM expense INNER JOIN categories ON categories.ID = expense.cat WHERE datestring = (?) AND type = (?)", [date1,type]).then((data) => {
                let people = []; 
              
                if(data.rows.length > 0) {
                    
                    for(let i = 0; i < data.rows.length; i++) {
                    
                        people.push({
                            id: data.rows.item(i).id,
                            date: data.rows.item(i).date,
                            type: data.rows.item(i).type,
                            cat: data.rows.item(i).cat,
                            amount: data.rows.item(i).amount,
                            desc: data.rows.item(i).desc,
                            datestring: data.rows.item(i).datestring,
                            name: data.rows.item(i).name
                        });   
                    }
                }
                resolve(people);
            }, (error) => {
                reject(error);
            });
         })
        });
   }
   getmonthExpencedata(date,month){
     return new Promise((resolve, reject) => {
         this.storage.openDatabase(globalStrings.mainDB).then(() => {
            this.storage.executeSql("SELECT type, SUM(amount) as count FROM expense  WHERE strftime('%m', datestring) = (?)  GROUP BY type", [month]).then((data) => {
                let people = [];


              
                if(data.rows.length > 0) {
                    
                    for(let i = 0; i < data.rows.length; i++) {
                        if(data.rows.item(i).type){
                         var obj:any={};
                         obj.type=data.rows.item(i).type
                         obj.count=data.rows.item(i).count    
                         people.push(obj)
                        }
                        

                        
                    }
                }
                resolve(people);
            }, (error) => {
                reject(error);
            });
         })
        });
   }
   getmonthdata(type,month){

      return new Promise((resolve, reject) => {
         this.storage.openDatabase(globalStrings.mainDB).then(() => {
            this.storage.executeSql("SELECT expense.cat,categories.name,SUM(expense.amount) as count FROM expense INNER JOIN categories ON categories.ID = expense.cat WHERE strftime('%m', datestring) = (?) AND type=(?) GROUP BY cat", [month,type]).then((data) => {
                let people = [];

                let catageory=[];
                let count=[];
                let colors=[];
              
                if(data.rows.length > 0) {
                    
                    for(let i = 0; i < data.rows.length; i++) {
                       if(data.rows.item(i).count)
                        catageory.push(data.rows.item(i).name);   
                        count.push(data.rows.item(i).count);
                        colors.push(this.dynamicColors());
                    }
                }
                people[0]=catageory
                people[1]=count
                people[2]=colors
                resolve(people);
            }, (error) => {
                reject(error);
            });
         })
        });
   }

  dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}
   getexpensedata(){

       return new Promise((resolve, reject) => {
         this.storage.openDatabase(globalStrings.mainDB).then(() => {
            this.storage.executeSql("SELECT expense.id,expense.date,expense.type,expense.cat,expense.amount,expense.desc,expense.datestring,categories.name FROM expense INNER JOIN categories ON categories.ID = expense.cat", []).then((data) => {
                let people = [];
              
                if(data.rows.length > 0) {
                    
                    for(let i = 0; i < data.rows.length; i++) {
                    
                        people.push({
                            id: data.rows.item(i).id,
                            date: data.rows.item(i).date,
                            type: data.rows.item(i).type,
                            cat: data.rows.item(i).cat,
                            amount: data.rows.item(i).amount,
                            desc: data.rows.item(i).desc,
                            datestring: data.rows.item(i).datestring,
                            name: data.rows.item(i).name
                        });   
                    }
                }
                resolve(people);
            }, (error) => {
                reject(error);
            });
         })
        });
   }
    getBanksData(id) {
     return new Promise((resolve, reject) => {
         this.storage.openDatabase(globalStrings.mainDB).then(() => {
            this.storage.executeSql("SELECT * FROM bank WHERE userid = (?)", [id]).then((data) => {
                let people = [];
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                        people.push({
                            id: data.rows.item(i).id,
                            name: data.rows.item(i).name,
                            number: data.rows.item(i).number,
                            ifsc: data.rows.item(i).ifsc,
                            branch: data.rows.item(i).branch
                        });   
                    }
                }
                resolve(people);
            }, (error) => {
                reject(error);
            });
         })
        });

   }
   getMembersData() {
     return new Promise((resolve, reject) => {
         this.storage.openDatabase(globalStrings.mainDB).then(() => {
            this.storage.executeSql("SELECT * FROM finance", []).then((data) => {
                let people = [];
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {

                       var date1 = new Date(data.rows.item(i).date)
                       var date2 = new Date();
                       var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                       var daysCount = Math.ceil(timeDiff / (1000 * 3600 * 24));
                       var months=0;
                       var days;
                       var intrest;
                       var total;
                       var isexceeded=""
                       if(daysCount>=28){
                           months=Math.floor(daysCount/30)
                           days=daysCount%30;
                           intrest=(data.rows.item(i).amount/100)*(data.rows.item(i).intrest)*months
                           total=intrest;
                       }else{
                           months=0;
                           days=daysCount;
                           total=0
                       }

                       if(months>25){
                          isexceeded="danger" 
                       }else{
                           isexceeded="dark"
                       }

                        people.push({
                            id: data.rows.item(i).id,
                            date: data.rows.item(i).date,
                            name: data.rows.item(i).name,
                            amount: data.rows.item(i).amount,
                            intrest: data.rows.item(i).intrest,
                            mobile: data.rows.item(i).mobile,
                            village: data.rows.item(i).village,
                            desc: data.rows.item(i).desc,
                            total: total,
                            months:months,
                            exceed:isexceeded
                            
                        });
                    }
                }
                resolve(people);
            }, (error) => {
                reject(error);
            });
         })
        });

   }
  }


