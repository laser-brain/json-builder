import { HubConnectionBuilder, HubConnection, LogLevel } from '@microsoft/signalr';
import { App, Plugin } from 'vue';

interface IAction {
  id: string;
  // eslint-disable-next-line no-unused-vars
  execute: (...args: any[]) => void;
}

interface ISignalROptions {
  url: string;
  events: string[];
}

let connection: HubConnection;

export function getConnectionId(): string | null {
  return connection.connectionId;
}

const callbacks: IAction[] = [];

// eslint-disable-next-line no-unused-vars
export function registerCallback(id: string, callbackAction: (...args: any[]) => any) {
  callbacks.push({ id, execute: callbackAction });
}

function executeCallbacks(id: string, args: any[]) {
  callbacks.filter((action) => action.id === `on${id}`).forEach((callback) => callback.execute(args));
}

const SignalR: Plugin = {
  install(app: App, options: ISignalROptions): any {
    connection = new HubConnectionBuilder()
      .withUrl(options.url)
      .configureLogging(LogLevel.Information)
      .build();

    const actions: IAction[] = options.events.map((event) => ({
      id: event,
      execute: (...args: any[]) => executeCallbacks(event, args),
    }));

    actions.forEach((action) => {
      connection.on(action.id, action.execute);
    });

    connection.start();
  },
};

export default SignalR;
