import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { ChartModel } from '../models/TempHumModel';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public historicalData: ChartModel[];
  public tempData : ChartModel;
  public x:any;

  private hubConnection: signalR.HubConnection;
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://localhost:4001/agenthub', {
                              skipNegotiation: true,
                              transport: signalR.HttpTransportType.WebSockets
                            })
                            .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
  public addTransferChartDataListener = () => {
    this.hubConnection.on('Broadcast', (label : string,payload : string) => {
      // this.label = label;
      let chart = new ChartModel(label,payload);
      // this.historicalData.push(chart);
      this.tempData = chart;
      let temp = chart.data
      console.log(chart.getDataInModel());
      // console.log(JSON.parse(this.tempData.data));
    });
  }
}
