import { Component, OnInit } from '@angular/core';
import { HubConnectionState } from '@aspnet/signalr';
import { TemperatureHumidityDto } from '../models/TemperatureHumidityDto';
import { RelayComponentStatusDto } from '../models/RelayComponentStatusDto';
import { AgentService } from '../services/agent.service';
import { Status } from '../util/EnumTypes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  temperatureValue: number = 0.0;
  humidityValue: number = 0.0;
  temperatureValueList: number[] = [];
  humidityValueList: number[] = [];
  lightStatus: string = "N/A"
  fanStatus: string = "N/A";
  fanSwitch: boolean = false

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
    let agentHub = AgentService.getInstance().Hub;

    let callbackMap = [
      {
        topic: 'home/temperature-humidity',
        handler: this.onTemperatureHumidityReadingCallback,
      },
      {
        topic: 'home/living-room/light/status',
        handler: this.onLivingRoomLightStatusReadingCallback,
      },
      {
        topic: 'home/living-room/fan/status',
        handler: this.onLivingRoomFanStatusReadingCallback,
      },
    ];

    if (agentHub.state === HubConnectionState.Connected) {
      agentHub.on(
        AgentService.OnHubConnectionStatus,
        this.onAgentMqttConnectionCallback
      );
      agentHub.on(AgentService.OnHubBroadcast, (topic, payload) => {
        let callback = callbackMap.find((c) => c.topic === topic);
        if (callback) {
          callback.handler(topic, payload);
        }
      });
    } else {
      alert('Agent is not connected with broker');
    }
  };

  onAgentMqttConnectionCallback = (isConnected: boolean) => {
    if (isConnected) {
      alert(`Agent is Connected with Broker`);
    } else {
      alert(`Agent is not Connected with Broker`);
    }
  };

  onTemperatureHumidityReadingCallback = (topic: string, payload: string) => {
    let temperatureHumidity = JSON.parse(payload) as TemperatureHumidityDto;
    this.humidityValue = temperatureHumidity.humidity;
    this.temperatureValue = Number.parseFloat(
      temperatureHumidity.temperature.toFixed(2)
    );
    this.temperatureValueList = [
      ...this.temperatureValueList,
      this.temperatureValue,
    ];
    this.humidityValueList = [...this.humidityValueList, this.humidityValue];
  };

  onLivingRoomLightStatusReadingCallback = (topic: string, payload: string) => {
    let componentStatus = JSON.parse(payload) as RelayComponentStatusDto;
    this.lightStatus = componentStatus.status
  };

  onLivingRoomFanStatusReadingCallback = (topic: string, payload: string) => {
    let componentStatus = JSON.parse(payload) as RelayComponentStatusDto;
    this.fanSwitch = componentStatus.status === Status.ON;
    this.fanStatus = componentStatus.status
  };



  handleFanSwitch = (e: Event) => {
    e.preventDefault()
    let topic = 'home/living-room/fan/status/change'
    let payload = JSON.stringify({ 'status': this.fanSwitch ? "OFF" : "ON" })
    AgentService.getInstance().Hub.invoke(AgentService.RpcInvokePublish, topic, payload)
  }

  ngOnInit(): void { }

  ngOnDestroy() { }
}
