import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //variables
  public AUTH_SERVER:string = "http://localhost:3000/api";
  public token:string = "";
  public idUser:string = "";
  public header = new HttpHeaders();

  constructor(
    private httpClient:HttpClient
  ) { }

  //sends the user's login credentials to the auth server
  loginUser(user: any): Observable<any>{
    return this.httpClient.post<any>(
      this.AUTH_SERVER+"/login", user
    ).pipe(tap(
        (res) => {
          console.log(res);
          if(res){
            this.saveDataLogin(res.token, res.id_user, res.role);
          }
        })
      );
  }

  //get the user´s username
  getProfile(idUser:string, token:string): Observable <any>{

    //create a HttpHeaders with authorization and other headers
    this.header = this.header
    .set('Authorization', token)
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.AUTH_SERVER+'/Profile?idUser='+idUser, {headers:this.header});
  }

  logOut(){
    this.token = "";
    this.idUser = "";
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("ID_USER");
  }

  //save data in local storage
  private saveDataLogin(token:string, idUser:string, role:string){
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("ID_USER", idUser);
    localStorage.setItem("ROLE_USER", role);
  }

  //stores an auth token on the local storage
  public saveToken(token:string){
    localStorage.setItem("ACCESS_TOKEN", token);
  }


}
