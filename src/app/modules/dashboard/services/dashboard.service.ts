import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  //variables
  public AUTH_SERVER:string = "http://localhost:3000/dashboard";
  public token:string = "";
  public dataDashboard!:any;
  public header = new HttpHeaders();

  constructor(
    private httpClient:HttpClient
  ) { }

  //counts all tickets
   getQuantityTickets(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER+'/Quantity');
  }

  //counts all tickets with opened status
  getOpenedTickets(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER+'/Opened-Tickets');
  }

  //counts all tickets with closed status
  getClosedTicket(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER+'/Closed-Tickets');
  }

  //counts all tickets created by month
  getTicketsPerMonth(): Observable<any>{
    return this.httpClient.get(this.AUTH_SERVER+'/ByMonth-Tickets');
  }

  //counts all tickets created by type
  getTicketsByTypes(): Observable<any>{
    return this.httpClient.get(this.AUTH_SERVER+'/Type-Tickets');
  }

  //shows the last three created FAQs
  getDashboardFAQS(): Observable<any>{
    return this.httpClient.get(this.AUTH_SERVER+'/Dashboard-FAQ')
  }

  //counts all tickets by user
  getQuantityTicketsByUser(idUser:string, token:string): Observable <any>{

    //create a HttpHeaders with authorization and other headers
    this.header = this.header
    .set('Authorization', token)
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.AUTH_SERVER+'/Ticket-Quantity?idUser='+idUser, {headers: this.header});
  }

  //counts all the opened tickets by user
   getOpenedTicketsByUser(idUser:string, token:string): Observable <any>{

    //create a HttpHeaders with authorization and other headers
    this.header = this.header
    .set('Authorization', token)
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.AUTH_SERVER+'/User-OpenedTickets?idUser='+idUser, {headers: this.header});
   }

   //counts all the closed tickets by user
   getClosedTicketsByUser(idUser:string, token:string): Observable <any>{

    //create a HttpHeaders with authorization and other headers
    this.header = this.header
    .set('Authorization', token)
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.AUTH_SERVER+'/User-ClosedTickets?idUser='+idUser, {headers: this.header});
   }

   //counts all the inventory by user
   getQuantityInventory(idUser:string, token:string): Observable <any> {

    //create a HttpHeaders with authorization and other headers
    this.header = this.header
    .set('Authorization', token)
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.AUTH_SERVER+'/Inventory-Quantity?idUser='+idUser, {headers:this.header});
   }





}
