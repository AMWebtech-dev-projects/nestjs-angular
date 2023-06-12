import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {


  constructor(private socket: Socket) {
  }

  close() {
    this.socket.disconnect();
  }

  sendMessage(eventName: string, message: object) {
    this.socket.emit(eventName, message)
  }

  msgReceived(eventName: string): Observable<any> {
    return new Observable((subscribe) => {
      this.socket.on(eventName, (data: any) => {
        console.log("coming msg by service====", data);
        subscribe.next(data);
      })
    })
  }
}




