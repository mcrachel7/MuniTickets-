import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { tap } from 'rxjs';

//modules
import { Ticket } from '../models/ticket';
import { LoginService } from '../../auth/services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  //variables
  public AUTH_SERVER: string= "http://localhost:3000/tickets"
  public idUser:string = "";
  public header = new HttpHeaders();

  constructor(private httpClient:HttpClient,
    private loginService: LoginService) { }

  //create new ticket by user
  createTicket(objTicket:Ticket, token:string): Observable<any>{

    //set up the HTTP headers
    this.header = this.header
    .set('Authorization', token)
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*');

  return this.httpClient.post<any>(this.AUTH_SERVER+"/new-ticket", objTicket, {headers:this.header})
  .pipe(tap(
    (res) => {
      console.log(res);
      if(res){
        this.loginService.saveToken(res.token);
      }
    })
  );
}

//list all the created tickets
loadTickets():Observable<any>{
  return this.httpClient.get(this.AUTH_SERVER+"/list-tickets")
}

//obtain the specific ticket by id
obtainTicket(id: string): Observable<any>
{
  return this.httpClient.get(this.AUTH_SERVER +"/obtain-Ticket/"+id)
}

//edit the ticket by the admin
updateTicketAdmin(id: string, ticket: Ticket): Observable<any>{
  return this.httpClient.put(this.AUTH_SERVER+"/update-ticket/"+id, ticket)
}

//edit the ticket by the user
editTicket(id:string, ticket: Ticket): Observable<any>{
  return this.httpClient.put(this.AUTH_SERVER+"/edit-Ticket/"+id, ticket)
}

//list tickets by user
viewTicket(idUser: string, token: string): Observable<any[]> {

  //create a HttpHeaders with authorization and other headers
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  return this.httpClient.get<any[]>(`${this.AUTH_SERVER}/view-ticket?idUser=${idUser}`, { headers })
    .pipe(
      tap((tickets) => {
        console.log(tickets);
      }),
      catchError((error) => {
        console.error('Error fetching tickets:', error);
        return [];
      })
    );
}


}
