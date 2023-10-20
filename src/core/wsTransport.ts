import EventBus from './EventBus';
import constants from './constain';

export enum WSEvents {
    Connect = 'Connect',
    Error = 'Error',
    Close = 'Close',
    Message = 'Message'
}

export class WebSocketTransport extends EventBus {
  private socket: WebSocket;

  private url: string;

  private ping: ReturnType<typeof setInterval>;

  constructor(url: string) {
    super();
    this.url = `${constants.WSS}${url}`;
  }

  public send(data: Object) {
    if (!this.socket) {
      throw Error('Соединение потеряно');
    }
    this.socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    if (this.socket) {
      throw new Error('Соединение уже установлено');
    }

    this.socket = new WebSocket(this.url);
    this.subscribe(this.socket);
    this.setPing();
    return new Promise<void>((resolve, reject) => {
      this.on(WSEvents.Error, reject);
      this.on(WSEvents.Connect, () => {
        this.off(WSEvents.Error, reject);
        resolve();
      });
    });
  }

  public close() {
    this.socket.close();
    clearInterval(this.ping);
  }

  private setPing() {
    this.ping = setInterval(() => {
      this.send({ type: 'ping' });
    }, 3000);
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      console.log('Соединение установлено');
      this.emit(WSEvents.Connect);
    });

    socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      this.emit(WSEvents.Close, event);
    });

    socket.addEventListener('message', (event) => {
      console.log('Получены данные', event.data);

      const data = JSON.parse(event.data);

      if (['pong'].includes(data?.type)) {
        return;
      }
      this.emit(WSEvents.Message, data);
    });

    socket.addEventListener('error', (event) => {
      console.log('Ошибка при соединении');
      this.emit(WSEvents.Error, event);
    });
  }
}
