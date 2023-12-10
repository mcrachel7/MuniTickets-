import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

//services
import { MainContentService } from 'src/app/modules/home/services/main-content/main-content.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  //variables
  private socket: Socket;
  private notifications: string[] = [];
  private ChangedStatusNotifications: string[] = [];
  public role:string = "";
  notificationSound: HTMLAudioElement = new Audio('../../../../assets/elegant-notification-sound.mp3');

  constructor(private mainContentService: MainContentService) {
    this.socket = io('http://localhost:3000/');
    this.connectToWebSocketServer();
  }

  private connectToWebSocketServer() {

    //establish a WebSocket connection
    this.socket.connect();
    this.adminNotification();
    this.userNotification();

  }

  //manages the new ticket notifications for the admin
  private adminNotification(){
    this.socket.on('adminNotification', (data) => {
      //push a new notification message
      this.notifications.push('Nuevo Ticket Creado: ' + data);

      //check the user's role
      this.role = this.mainContentService.getRoleUser();
      if(this.role=='administrador'){
      this.playNotificationSound();
      }

    });
  }
//manages the changed status notifications for the user
  private userNotification(){
    this.socket.on('userNotification', (data) =>{
      this.ChangedStatusNotifications.push('Se ha cambiado el Estado de tu Ticket: ' + data);

      this.role= this.mainContentService.getRoleUser();
      if(this.role=='usuario'){
        this.playNotificationSound();
      }
    })
  }

  //play notification sound
  private playNotificationSound() {
    this.notificationSound.play();
  }

  //returns the stored notifications
  getNotifications(): string[] {
    return this.notifications;
  }

  //deletes the notifications
  clearNotifications() {
    this.notifications = [];
  }

   //returns the stored notifications
   getChangedStatusNotifications(): string[] {
    return this.ChangedStatusNotifications;
  }

  //deletes the notifications
  clearChangedStatusNotifications() {
    this.ChangedStatusNotifications = [];
  }

  //sends a new ticket notification
  sendNewTicketNotification(title: string) {
    this.socket.emit('newTicket', title);
  }

  //sends a changed ticket status notification
  sendChangedStatusNotification(title: string) {
    this.socket.emit('changedTicketStatus', title);
  }


  //ends the socket connection
  disconnect() {
    this.socket.disconnect();
  }

}
