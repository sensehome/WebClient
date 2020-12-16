import { Component, OnInit } from '@angular/core';
import { HubConnectionState } from '@aspnet/signalr';
import { TemperatureHumidityDto } from '../models/TemperatureHumidityDto';
import { AgentService } from '../services/agent.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  looper: any;
  temperatureValue: number = 0.0;
  humidityValue: number = 0.0;
  temperatureValueList: number[] = [];
  humidityValueList: number[] = [];

  constructor() {
    this.initializeAgentHubConnection();
  }

  initializeAgentHubConnection = () => {
    if (
      AgentService.getInstance().Hub.state === HubConnectionState.Disconnected
    ) {
      AgentService.getInstance()
        .Hub.start()
        .then(() => {
          this.agentHubSubsriptions();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  agentHubSubsriptions = () => {
    if (AgentService.getInstance().Hub.state === HubConnectionState.Connected) {
      console.log('Subscriptions');
      AgentService.getInstance().Hub.on('Broadcast', (topic, payload) => {
        let temperatureHumidity = JSON.parse(payload) as TemperatureHumidityDto;
        this.humidityValue = temperatureHumidity.humidity;
        this.temperatureValue = Number.parseFloat(temperatureHumidity.temperature.toFixed(2));
        this.temperatureValueList = [
          ...this.temperatureValueList,
          this.temperatureValue,
        ];
        this.humidityValueList = [
          ...this.humidityValueList,
          this.humidityValue,
        ];
      });

      AgentService.getInstance().Hub.on(
        'AgentConnectionStatus',
        (payload) => {}
      );
    }
  };

  ngOnInit(): void {
    // this.looper = setInterval(() => {
    //   this.temperatureValue = Number.parseFloat(
    //     (Math.random() * 20).toFixed(2)
    //   );
    //   this.humidityValue = Number.parseFloat((Math.random() * 100).toFixed(2));
    //   this.temperatureValueList = [
    //     ...this.temperatureValueList,
    //     this.temperatureValue,
    //   ];
    //   this.humidityValueList = [...this.humidityValueList, this.humidityValue];
    // }, 2000);
  }

  ngOnDestroy() {
    if (this.looper) {
      clearInterval(this.looper);
    }
  }
}
