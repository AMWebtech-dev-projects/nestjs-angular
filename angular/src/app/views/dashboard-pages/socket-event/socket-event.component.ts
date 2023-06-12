import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { currentUser, JwtService, UsersService } from '../../../shared-ui';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-socket-event',
  templateUrl: './socket-event.component.html',
  styleUrls: ['./socket-event.component.scss'],
})
export class SocketEventComponent implements OnInit {
  usersList: currentUser[] = [];

  constructor(
    private jwtService: JwtService,
    private _WebSocketService: WebSocketService,
    private usersService: UsersService,
    private toastr: ToastrService,
    private socket: Socket
  ) { }

  ngOnInit(): void {
    this.pingForGettingEventByService();
    this.directGetmsgIncomponent();

    // without socket getting event
    this.getServerSendEvent()
  }

  getServerSendEvent() {
    const eventSource = new EventSource(environment.baseUrl + 'users/sse');
    eventSource.onmessage = ({ data }) => {
      console.log("comming event by SSE(server send event)", data);
      // const message = document.createElement('li');
      // message.innerText = 'New message: ' + data;
      // document.body.appendChild(message);
    }
  }

  sendDemoEvent() {
    this._WebSocketService.sendMessage('SocketJoinEvent',
      {
        "_id": "6464b7d553a04ed0adfb2a48",
        "firstName": new Date().getTime() + ' send by ui',
        "lastName": "sen",
        "email": "bharat@amwebtech.com",
        "phoneNumber": 9827848695,
        "gender": "male",
        "dob": "17/05/2023",
        "role": "admin",
        "status": 1,
        "skills": [],
        "techStack": [],
        "createdAt": "2023-05-17T11:17:41.187Z",
        "updatedAt": "2023-05-17T11:17:41.187Z",
        "__v": 0,
        "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjRiN2Q1NTNhMDRlZDBhZGZiMmE0OCIsImlhdCI6MTY4NDc0ODMxNCwiZXhwIjoxNjg0NzU1NTE0fQ.UkikV6HN62VZsUS3RKsWBizCsX1CbY5uTIdWLRxKDec"
      })
  }

  pingForGettingEventByService() {
    this._WebSocketService
      .msgReceived('SocketDemoEvent')
      .subscribe((eventInfo: any) => {
        return this.appendEventMsg(eventInfo);
      });
  }

  appendEventMsg(eventInfo: any) {
    this.usersList.push(eventInfo);
  }

  directGetmsgIncomponent() {
    // getmsg(event: string): Observable<any> {
    this.socket.on('SocketDemoEvent', (data: any) => {
      console.log('getttingMsgDirectcompo', data);
      // this.appendEventMsg(data);
    });
  }

}
