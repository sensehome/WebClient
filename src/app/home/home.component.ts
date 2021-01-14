import { Component, OnInit } from '@angular/core';
import { HubConnectionState } from '@aspnet/signalr';
import { TemperatureHumidityDto } from '../models/TemperatureHumidityDto';
import { RelayComponentStatusDto } from '../models/RelayComponentStatusDto';
import { AgentService } from '../services/agent.service';
import { Status } from '../util/EnumTypes';
import { BrokerCommands, BrokerEvents } from '../util/BrokerSystTopics';
import { APIService } from '../services/api.service';
import { MotionDetectionDto } from '../models/MotionDetectionDto';

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
  lightStatus: string = 'N/A';
  lightSwitch: boolean = false;
  fanStatus: string = 'N/A';
  fanSwitch: boolean = false;

  isWebAndAgentIsConnected = false;
  isAgentAndBrokerIsConnected = false;

  connectedClients = [];

  isActiveConnectionLoading = false;

  isHomeAlertHasSignal : boolean = false;

  constructor(private apiService: APIService) {
    this.initializeAgentHubConnection();
  }

  initializeAgentHubConnection = () => {
    if (
      AgentService.getInstance().Hub.state === HubConnectionState.Disconnected
    ) {
      AgentService.getInstance()
        .Hub.start()
        .then(() => {
          this.isWebAndAgentIsConnected = true;
          this.isAgentAndBrokerIsConnected = true;
          this.agentHubSubsriptions();
          this.getBrokerStatus();
        })
        .catch((err) => {
          console.log(err);
        });

      AgentService.getInstance().Hub.onclose((err) => {
        this.isWebAndAgentIsConnected = false;
        this.isAgentAndBrokerIsConnected = false;
        this.autoReconnectAgent();
      });
    }else{
      this.isWebAndAgentIsConnected = true
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
      {
        topic: 'home/motion-detection',
        handler: this.onMotionDetectionCallback,
      }
    ];

    if (agentHub.state === HubConnectionState.Connected) {
      agentHub.on(
        AgentService.OnHubConnectionStatus,
        this.onAgentMqttConnectionCallback
      );
      agentHub.on(AgentService.OnHubBroadcast, (topic, payload) => {
        if (topic.startsWith('$SYS')) {
          this.onSystemTopicsCallback(topic, payload);
          return;
        }
        let callback = callbackMap.find((c) => c.topic === topic);
        if (callback) {
          callback.handler(topic, payload);
        }
      });
    } else {
      alert('Agent is not connected with broker');
    }
  };

  autoReconnectAgent = () => {
    setTimeout(function () {
      this.initializeAgentHubConnection();
    }, 5000);
  };

  getBrokerStatus = () => {
    AgentService.getInstance().Hub.invoke(
      AgentService.RpcInvokePublish,
      BrokerCommands.GetConnectedClients,
      ''
    );
  };

  onAgentMqttConnectionCallback = (isConnected: boolean) => {
    if (isConnected) {
      if (!this.isAgentAndBrokerIsConnected) {
        this.isAgentAndBrokerIsConnected = true;
        this.getBrokerStatus();
      }
    } else {
      this.isAgentAndBrokerIsConnected = false;
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
    this.lightSwitch = componentStatus.status === Status.ON;
    this.lightStatus = componentStatus.status;
  };

  onLivingRoomFanStatusReadingCallback = (topic: string, payload: string) => {
    let componentStatus = JSON.parse(payload) as RelayComponentStatusDto;
    this.fanSwitch = componentStatus.status === Status.ON;
    this.fanStatus = componentStatus.status;
  };

  onMotionDetectionCallback = (topic : string, payload : string) => {
    let status = JSON.parse(payload) as MotionDetectionDto;
    this.isHomeAlertHasSignal = status.signal;
  };

  onSystemTopicsCallback = (topic: string, payload: string) => {
    if (topic === BrokerEvents.ConnectedClients) {
      if (this.isActiveConnectionLoading) {
        return;
      }
      this.isActiveConnectionLoading = true;
      let clients = JSON.parse(payload);
      let connectedMqttClientIds = clients['IDList'] as Array<string>;
      this.connectedClients = [];
      connectedMqttClientIds.forEach((id, index) => {
        this.apiService.getUserById(id).subscribe(
          (res) => {
            this.connectedClients = [...this.connectedClients, res['name']];
            if (index === connectedMqttClientIds.length - 1) {
              this.isActiveConnectionLoading = false;
            }
          },
          (err) => {}
        );
      });
    }
  };

  handleFanSwitch = (e: Event) => {
    e.preventDefault();
    let topic = 'home/living-room/fan/status/change';
    let payload = JSON.stringify({ status: this.fanSwitch ? 'OFF' : 'ON' });
    AgentService.getInstance().Hub.invoke(
      AgentService.RpcInvokePublish,
      topic,
      payload
    );
  };

  handleLightSwitch = (e: Event) => {
    e.preventDefault();
    let topic = 'home/living-room/light/status/change';
    let payload = JSON.stringify({ status: this.lightSwitch ? 'OFF' : 'ON' });
    AgentService.getInstance().Hub.invoke(
      AgentService.RpcInvokePublish,
      topic,
      payload
    );
  };

  ngOnInit(): void {}

  ngOnDestroy() {}
}
