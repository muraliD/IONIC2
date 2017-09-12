import { Component ,ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { groupArray } from 'group-array';
import {ArrayFilterPipe} from '../../pipes/group-by-pipe';
import { Mydata } from '../../providers/mydata'
import moment from 'moment'; 

/*
  Generated class for the MyHome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-home',
  templateUrl: 'my-home.html'
})
export class MyHomePage {
   @ViewChild('barCanvas') barCanvas;
   @ViewChild('doughnutCanvas') doughnutCanvas;
   @ViewChild('lineCanvas') lineCanvas;
 
    barChart: any;
    doughnutChart: any;
    lineChart: any;
    players:any;
    teams:any;
    booksByStoreID:any;
    dashboard:any
    segmentData:string
    Inc:string;
    Exp:string;
    base:string;
    type:string;
    month:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public serviceData: Mydata) {
     this.dashboard="exp"
     this.month=moment(new Date()).format('MMMM')
  }
 onSegmentChanged(segmentButton) {
     console.log("Segment changed to", segmentButton.value);
     if(segmentButton.value=="inc"){
        this.segmentData = "1"
        this.type="Income";
        this.base=this.Inc
     }else{
        this.segmentData = "2"
        this.type="Expence";
        this.base=this.Exp
     }
    this.segmentDta();
  }

  segmentDta(){

var month=moment(new Date()).format('MM')
        this.serviceData.getmonthdata(this.segmentData ,month).then((result) => {
        //this.serviceData.getmonthExpencedata(datestring,month).then((result) => {
       
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: result[0],
                datasets: [{
                    label: "",
                    data: result[1],
                    backgroundColor:result[2],
                    hoverBackgroundColor:result[2]
                }]
            }
 
        });
 
        }, (error) => {
            console.log("ERROR: ", error);
        });    
    
  }

  ionViewDidLoad() {
        this.segmentData = "2"
        this.type="Expence";
        this.segmentDta();
        var month=moment(new Date()).format('MM')
        this.serviceData.getmonthExpencedata("",month).then((result) => {
           var data:any=result;
             for(let i = 0; i < data.length; i++) {
               if(data[i].type=="1"){
                this.Inc=data[i].count
               }else{
                 this.Exp=data[i].count
               }
             }
            this.base=this.Exp

            }, (error) => {
            console.log("ERROR: ", error);
        });
        
   
   
        // this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
        //     type: 'doughnut',
        //     data: {
        //         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        //         datasets: [{
        //             label: '# of Votes',
        //             data: [12, 19, 3, 5, 2, 3],
        //             backgroundColor: [
        //                 'rgba(255, 99, 132, 0.2)',
        //                 'rgba(54, 162, 235, 0.2)',
        //                 'rgba(255, 206, 86, 0.2)',
        //                 'rgba(75, 192, 192, 0.2)',
        //                 'rgba(153, 102, 255, 0.2)',
        //                 'rgba(255, 159, 64, 0.2)'
        //             ],
        //             hoverBackgroundColor: [
        //                 "#FF6384",
        //                 "#36A2EB",
        //                 "#FFCE56",
        //                 "#FF6384",
        //                 "#36A2EB",
        //                 "#FFCE56"
        //             ]
        //         }]
        //     }
 
        // });
 
        
  }

}
