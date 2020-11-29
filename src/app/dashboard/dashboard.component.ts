import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../services/signalR.service';
import { HttpClient } from '@angular/common/http';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ChartModel } from '../models/TempHumModel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public lineChartLabels: string[] = ['Real time data for the chart'];
  public lineChartType: string = 'line';
  public chartLegend: boolean = true;
  public lineChartOptions: ChartOptions  = {
    responsive: true
  };
  public tempData : ChartModel[];

  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartPlugins = [];


  public humArr = this.signalRService.humidityArr;
  public tempArr = this.signalRService.temperatureArr;
  public dates= this.signalRService.dateArr;

  humidityInt :Number;

  isCheckedFan = false;
  isCheckedLight = false;
  // temperatureFloat = parseFloat(this.signalRService.tempData?.getDataInModel().temperature);

  // lineChartData: ChartDataSets[] = [
  //   { data: , label: 'Product A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Product B' }
  // ];



  // public colors: any[] = [{ backgroundColor: '#5491DA' }, { backgroundColor: '#E74C3C' }, { backgroundColor: '#82E0AA' }, { backgroundColor: '#E5E7E9' }]

  constructor(public signalRService: SignalRService, private http: HttpClient) {

   }
  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();


    // this.startHttpRequest();
    // this.dummyMethod();
  }
  private startHttpRequest = () => {
    this.http.get('https://localhost:4001/api/chart')
      .subscribe(res => {
        console.log(res);
      })
  }
  fanSwitch(){
    this.isChecked = !this.isChecked;
  }

}
