const BaseCommand = "$SYS/request/broker";
const ClientBaseCommand = `${BaseCommand}/clients`

const BaseEvent = "$SYS/broker";
const ClientBaseEvent = `${BaseEvent}/clients`

export const BrokerCommands = {
    GetConnectedClients: `${ClientBaseCommand}/connected`,
    GetConnectedClientsCount: `${ClientBaseCommand}/connected/count`,
    PatchDisconnectClient: `${ClientBaseCommand}/disconnect/command`,
    GetClientIP: `${ClientBaseCommand}/ip`,
}


export const BrokerEvents = {
    ConnectedClients :`${ClientBaseEvent}/connected`,
    ConnectedClientsCount: `${ClientBaseEvent}/connected/count`,
    DisconnectClient: `${ClientBaseEvent}/disconnect/command`,
    ClientIP: `${ClientBaseEvent}/ip`,
}