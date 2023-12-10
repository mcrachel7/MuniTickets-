import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';



@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrls: ['./admin-notification.component.scss']
})
export class AdminNotificationComponent implements OnInit {


  constructor(
    private webSocketService: WebSocketService
    ) {}

  ngOnInit(): void {
  }

  get notifications(): string[] {
    return this.webSocketService.getNotifications();
  }

  clearNotifications() {
    this.webSocketService.clearNotifications();
  }



}
