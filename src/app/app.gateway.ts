
import {
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	constructor(
	) { }

	@WebSocketServer() server: Server;
	private logger: Logger = new Logger();

	public handleConnection(client: Socket, ...args): any {
		this.logger.log('CLIENT CONNECTED');
		console.log('Client info', client.id);
	}

	public handleDisconnect(client: Socket): any {
		this.logger.log('CLIENT DISCONNECTED');
		console.log('CLIENT info', client.id);
	}

	afterInit(server: Server): any {
		this.logger.log('WEBSOCKET GATWEAY INITIALIZED');
	}

	// CHAT
	@SubscribeMessage('message-user-to-provider')
	public async messageUserToProvider(@MessageBody() chatData: any) {
		chatData.sentBy = 'USER';
		console.log("message coming from.... client",chatData)
		this.server.emit(`message-provider`, chatData);
	}
}