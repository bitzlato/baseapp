import { notificatorUrl } from 'web/src/api';
import { ScopedMutator } from 'swr/dist/types';
import { handleWebsocketMessage } from './websocketMessageHandler';
import { getStatusCodeDescription } from './specificStatusCodeMappings';
import { IWebSocketTransport } from './types';

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });

class WebSocketTransport implements IWebSocketTransport {
  private ws: WebSocket | undefined;

  private shouldReconnect: boolean = true;

  private readonly mutate: ScopedMutator;

  constructor(mutate: ScopedMutator) {
    this.mutate = mutate;

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  async connect(): Promise<void> {
    this.ws = new WebSocket(notificatorUrl());

    this.ws.onopen = () => {
      console.log('Connected');
    };

    this.ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      handleWebsocketMessage(this.mutate, message);
    };

    this.ws.onclose = async (e) => {
      console.log(
        `Websocket connection close. Code: ${e.code}. Status: ${getStatusCodeDescription(
          e.code,
        )}. Clean: ${e.wasClean}. Reason: ${e.reason}`,
      );
      await sleep(500);
      if (this.shouldReconnect) {
        this.connect();
      }
    };

    this.ws.onerror = () => {};

    await this.waitTillConnect(true);
  }

  async disconnect(): Promise<void> {
    this.shouldReconnect = false;

    this.ws?.close(1000, 'Websocket connection closed by client');
    await sleep(300); // waiting untill connection closed
  }

  private async waitTillConnect(log: boolean = true): Promise<void> {
    if (log) {
      console.log('Connecting...');
    }
    await sleep(1000);
    if (this.ws?.readyState === 0 && this.shouldReconnect) {
      await this.waitTillConnect(false);
    }
  }
}

export function runNotificator(mutate: ScopedMutator): IWebSocketTransport {
  return new WebSocketTransport(mutate);
}
