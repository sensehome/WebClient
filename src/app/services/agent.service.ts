import * as SignalR from "@aspnet/signalr"

export class AgentService {
  public static OnHubConnectionStatus : string = "AgentConnectionStatus"
  public static OnHubBroadcast : string = "Broadcast"
  public static RpcInvokePublish : string = "PublishToMqttBroker"

  private static instance : AgentService
  public readonly Hub : SignalR.HubConnection

  private constructor(hubEndpoint : string) {
    this.Hub = new SignalR.HubConnectionBuilder()
                          .withUrl(hubEndpoint)
                          .build();
  }

  public static getInstance() : AgentService {
    if(!AgentService.instance){
      AgentService.instance = new AgentService('https://localhost:4001/agenthub')
    }
    return AgentService.instance
  }

  public dispose() {
    AgentService.instance = null
  }
}