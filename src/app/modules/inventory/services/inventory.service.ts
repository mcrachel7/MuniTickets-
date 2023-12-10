import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { tap } from 'rxjs';

//modules
import { Inventory } from '../models/inventory';
import { LoginService } from '../../auth/services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  //variables
  public AUTH_SERVER: string= "http://localhost:3000/inventory"
  public idUser:string = "";
  public header = new HttpHeaders();

  constructor(private httpClient:HttpClient,
    private loginService: LoginService) { }

  //create new inventory by user
  createInventory(objInventory:Inventory, token:string): Observable<any>{

    //set up the HTTP headers
    this.header = this.header
    .set('Authorization', token)
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*');

  return this.httpClient.post<any>(this.AUTH_SERVER+"/new-inventory", objInventory, {headers:this.header})
  .pipe(tap(
    (res) => {
      console.log(res);
      if(res){
        this.loginService.saveToken(res.token);
      }
    })
  );
}

//list inventory by user
viewInventory(idUser:string, token:string): Observable<any>{

  //create a HttpHeaders with authorization and other headers
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  return this.httpClient.get<any[]>(`${this.AUTH_SERVER}/view-inventory?idUser=${idUser}`, { headers })
    .pipe(
      tap((inventory) => {
        console.log(inventory);
      }),
      catchError((error) => {
        console.error('Error fetching Inventory:', error);
        return [];
      })
    );
}

//list all the inventory tickets
loadAdminInventory():Observable<any>{
  return this.httpClient.get(this.AUTH_SERVER+"/list-inventory")
}

//obtain the specific inventory by id
obtainInventory(id: string): Observable<any>
{
  return this.httpClient.get(this.AUTH_SERVER +"/obtain-Inventory/"+id)
}

//edit the inventory by the user
editInventory(id:string, objInventory: Inventory): Observable<any>{
  return this.httpClient.put(this.AUTH_SERVER+"/update-inventory/"+id, objInventory)
}

//delete the inventory by id
deleteInventory(id: string): Observable<any>{
  return this.httpClient.delete(this.AUTH_SERVER+"/delete-inventory/"+id)
}

}
