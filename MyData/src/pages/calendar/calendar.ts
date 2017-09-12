import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {NewRecordPage} from '../../pages/new-record/new-record'; 
import {DetailRecordPage} from '../../pages/detail-record/detail-record'; 
import moment from 'moment';
import { Mydata } from '../../providers/mydata' ; 

/*
  Generated class for the Calendar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {
private localdate:any;
private exepenses:any;
private income:any;
private expense:any;
private incAmt:any;
private expAmt:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public serviceData: Mydata) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }
    eventSource;
    viewTitle;
    isToday: boolean;
    calendar = {
        mode: 'month',
        currentDate: new Date()
    }; // these are the variable used by the calendar.
    loadEvents() {
       // this.eventSource = this.createRandomEvents();
    }
    ionViewWillEnter(){
      //this.loadEvents()
      this.getevents();
  }
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }
    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }
    changeMode(mode) {
        this.calendar.mode = mode;
    }
    today() {
        this.calendar.currentDate = new Date();
    }
    monthData(){
        var datestring=moment(this.localdate.selectedTime).format('YYYY-MM-DD');
        var month=moment(this.localdate.selectedTime).format('MM')

        //this.serviceData.getmonthdata(datestring,month).then((result) => {
        this.serviceData.getmonthExpencedata(datestring,month).then((result) => {
       console.log(result);
 
        }, (error) => {
            console.log("ERROR: ", error);
        });
    }
    onTimeSelected(ev) {
      this.localdate=ev;
      var datestring=moment(this.localdate.selectedTime).format('YYYY-MM-DD');
     this.serviceData.getCounts(datestring).then((result) => {
       this.incAmt= result[0]
       this.expAmt= result[1]
      console.log(result);
        }, (error) => {
            console.log("ERROR: ", error);
        });
        // console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
        //     (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }
    getevents(){
        
        this.serviceData.getexpensedata().then((result) => {
         this.exepenses=result;
         this.expense=[];
         this.income=[];
           var events = [];

        for(let i = 0; i <  this.exepenses.length; i++) {
            if(this.exepenses[i].type=="1"){
               this.income.push(this.exepenses[i])
            }if(this.exepenses[i].type=="2"){
                this.expense.push(this.exepenses[i])
            }

 var datestr=this.exepenses[i].date;           
 var date = datestr.replace("00:00:00", "12:00:00");
 var type=this.exepenses[i].type=="1"?"income":"Expensive";
            
            events.push({
                    title: type+"-" + this.exepenses[i].amount+" Rs"+"("+this.exepenses[i].name+")",
                    startTime: new Date(date),
                    endTime: new Date(date),
                    allDay: true
                });

 
            

           }
           this.eventSource=events;
            // console.log("ERROR: ", this.income);
            //  console.log("ERROR: ", this.expense);
           

        
     
        }, (error) => {
            console.log("ERROR: ", error);
        });
    }
    addevent(type){
       
     this.navCtrl.push(NewRecordPage,this.localdate.selectedTime);
     
    
     
    }
    detailRecord(type){
         this.navCtrl.push(DetailRecordPage,{objtype:type,date:this.localdate.selectedTime});
    }
    onCurrentDateChanged(event:Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }
    createRandomEvents() {
        var events = [];
        events.push({
                    title: 'Event - ' + "murali",
                    startTime: new Date("Fri Mar 31 2017 00:00:00 GMT+0530 (IST)"),
                    endTime: new Date("Fri Mar 31 2017 00:00:00 GMT+0530 (IST)"),
                    allDay: false
                });

        events.push({
                    title: 'Event - ' + "dadi",
                    startTime: new Date("Fri Mar 24 2017 12:00:00 GMT+0530 (IST)"),
                    endTime: new Date("Fri Mar 24 2017 12:00:00 GMT+0530 (IST)"),
                    allDay: false
                });        
        // for (var i = 0; i < 50; i += 1) {
        //     var date = new Date();
        //     var eventType = Math.floor(Math.random() * 2);
        //     var startDay = Math.floor(Math.random() * 90) - 45;
        //     var endDay = Math.floor(Math.random() * 2) + startDay;
        //     var startTime;
        //     var endTime;
        //     if (eventType === 0) {
        //         startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
        //         if (endDay === startDay) {
        //             endDay += 1;
        //         }
        //         endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
        //         events.push({
        //             title: 'All Day - ' + i,
        //             startTime: startTime,
        //             endTime: endTime,
        //             allDay: true
        //         });
        //     } else {
        //         var startMinute = Math.floor(Math.random() * 24 * 60);
        //         var endMinute = Math.floor(Math.random() * 180) + startMinute;
        //         startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
        //         endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
        //         events.push({
        //             title: 'Event - ' + i,
        //             startTime: startTime,
        //             endTime: endTime,
        //             allDay: false
        //         });
        //     }
        // }
        
        console.log("events fired")
        return events;
    }
    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }
    markDisabled = (date:Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };

}
