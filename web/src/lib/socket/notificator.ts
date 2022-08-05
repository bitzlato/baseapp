import { notificatorUrl } from 'web/src/api';
import { getStatusCodeDescription } from './specificStatusCodeMappings';
import { IWebSocketTransport, NotificationSubscriber } from './types';

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });

class WebSocketTransport implements IWebSocketTransport {
  private ws: WebSocket | undefined;

  private shouldReconnect: boolean = true;

  private subscribers: Array<NotificationSubscriber> = [];

  constructor() {
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  subscribe(subscriber: NotificationSubscriber): () => void {
    this.subscribers.push(subscriber);

    return () => {
      this.subscribers = this.subscribers.filter((item) => item !== subscriber);
    };
  }

  handleMessage(e: MessageEvent): void {
    const message = JSON.parse(e.data);

    this.subscribers.forEach((callback) => {
      callback(message);
    });
  }

  async connect(): Promise<void> {
    this.ws = new WebSocket(notificatorUrl());

    this.ws.onopen = () => {
      console.log('Connected');
    };

    this.ws.onmessage = (e) => this.handleMessage(e);

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

export function runNotificator(): IWebSocketTransport {
  return new WebSocketTransport();
}
