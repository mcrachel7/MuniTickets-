import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';


@Component({
  selector: 'app-user-notification',
  templateUrl: './user-notification.component.html',
  styleUrls: ['./user-notification.component.scss']
})
export class UserNotificationComponent implements OnInit{

  constructor( private webSocketService: WebSocketService){}

  ngOnInit(): void {
  }

  get notifications(): string[] {
    return this.webSocketService.getChangedStatusNotifications();
  }

  clearNotifications() {
    this.webSocketService.clearChangedStatusNotifications();
  }



}
