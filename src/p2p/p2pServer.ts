import * as WebSocket from 'ws';
import { logger } from '../util/log';
import {Message} from "../messages/message";

export class P2PServer {
  constructor() {}

  private wss?: WebSocket.Server = undefined;
  private readonly liveliness: Map<WebSocket, boolean> = new Map();

  async start() {
    await this.startServer();

    await this.startClient();
  }


  async sendMessage(message: Message) {
      const self = this;
      if(self.wss === undefined) {
          logger.warn("Tried to send message to uninitiated wss");
      } else {
          self.wss.clients.forEach((ws: WebSocket) => {
              ws.send(message);
          })
      }
  }

  private async startServer() {
    logger.info('Starting P2P Server');
    const self = this;
    self.wss = new WebSocket.Server({ port: 8083 });

    self.wss.on('connection', (ws: WebSocket) => {
      logger.verbose('Detected connection to server');

      self.liveliness.set(ws, true);

      ws.on('pong', () => self.heartbeat(self, ws));
    });

    const interval = setInterval(function ping() {
      if (self.wss !== undefined) {
        self.wss.clients.forEach((ws: WebSocket) => {
          const alive = self.liveliness.get(ws);
          if (alive === false) {
            logger.info('Detected dead connection, terminating');
            return ws.terminate();
          }

          self.liveliness.set(ws, false);
          ws.ping(self.noop);
        });
      }
    }, 5000);
  }

  private async startClient() {
    logger.info('Starting P2P Clients');

    const self = this;
    const ws = new WebSocket('ws://localhost:8083');
    ws.on('open', function open() {
      ws.send('something');
    });

    ws.on('message', function incoming(data) {
      logger.info('Got client message: %s', data);
    });
  }

  noop() {}

  heartbeat(self: P2PServer, ws: WebSocket) {
    self.liveliness.set(ws, true);
  }
}

interface Liveliness {
  isAlive: boolean;
}
